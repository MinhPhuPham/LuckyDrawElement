<template>
  <div class="card-module flex flex-wrap" ref="mysCardRef" v-if="isNotEmptyData">
    <div
      v-for="(item, index) of dataSources"
      :class="['img-box', { active: selectedCardValue[`${item.id}${index}`] }]"
      :key="item.id + index"
      :style="{ width: `${cardWidth}px`, height: `${cardHeight}px` }"
      @click="handleClick(index, item)"
    >
      <div class="back">
        <a class="back_title">{{ $t('label.no_num') }}{{ index + 1 }}</a>
        <img class="img-item" :src="item.url || require('@/assets/images/mys-cards/project_card_bg.png')" />
      </div>
      <div class="front">
        <div class="image-top">
          <a class="title_item">{{ selectedCardValue[`${item.id}${index}`]?.name || $t('label.mystery_card') }}</a>
          <img class="img-item" :src="item.cardFront || require('@/assets/images/mys-cards/card-front.png')" />
        </div>
        <div class="content flex items-center">
          <a class="subtitle_item text-medium">
            {{ selectedCardValue[`${item.id}${index}`]?.subtitle || $t('label.merry_thank') }}
          </a>
        </div>
      </div>
    </div>
    <ms-inner-load :refParent="$refs.mysCardRef" :loading="dataSourceLoading" />
  </div>
  <ms-empty v-else />
</template>

<script lang="ts">
import { ICardDataSource } from '@/shared/models/datasources'
import { MIRACEL_CARD_ACTION } from '@/store/mysteries/actions'
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import InnerLoader from '@/shared/composables/loader/InnerLoader.vue'
import Empty from '@/shared/composables/empty/Empty.vue'
import ConfettiService from '@/helpers/confetti'
import { MIRACLE_RESPONSIVE } from '@/shared/consts/miracle-card-responsive'
import DatasourcesSerivce from '@/services/data-sources'
import { IMiracle } from '@/shared/models/miracle'
import { errorNotification, successNotification } from '@/helpers/notification'

@Options({
  components: {
    [InnerLoader.name]: InnerLoader,
    [Empty.name]: Empty,
  },
  name: 'ms-cards',
})
export default class MysCardComponent extends Vue {
  @Prop({ default: false, type: Boolean }) isPreview!: boolean
  @Prop({ default: '', type: String }) currentResourceId!: string

  minCardWidth: number = 160
  maxCardWidth: number = 225

  ratioCard: number = 331 / 222
  cardWidth: number = 222
  cardHeight: number = this.cardWidth * this.ratioCard
  cardWrapWidth: number = 0

  timer: number | null = null

  // eslint-disable-next-line
  selectedCardValue: any = {}

  get selectedMiracle(): IMiracle {
    return this.$store.getters.miracle
  }

  get dataSourceLoading() {
    return this.$store.getters.dataSourceLoading
  }

  get isNotEmptyData() {
    return !!this.dataSources.length
  }

  get dataSources(): ICardDataSource[] {
    return this.$store.getters.datasources
  }

  async handleClick(index: number, itemSelected: ICardDataSource) {
    if (!!Object.keys(this.selectedCardValue).length && !this.isPreview) {
      return errorNotification('Opps! Seems you selected. Manager setting can only be selected once')
    }
    this.isPreview ? this.successChoosen(index, itemSelected) : this.productAction(index, itemSelected)
  }

  async productAction(index: number, itemSelected: ICardDataSource) {
    // console.log(index, itemSelected)
    const datasourceService = new DatasourcesSerivce(this.$database, this.selectedMiracle.id)
    const response = await datasourceService.checkDataResouceSelected(itemSelected.id)
    const resourceChooseId = sessionStorage.getItem('resourceChooseId') as string

    if (!response) {
      errorNotification('Opps! Have error occurred. Please select another after refesh')
      resourceChooseId && (await datasourceService.loadSingleDataSourceMiracle(true, resourceChooseId))
      return
    }
    resourceChooseId &&
      (await datasourceService.setSelectedDataResource(resourceChooseId, itemSelected).then(() => {
        this.successChoosen(index, itemSelected)
        successNotification(`${this.$t('message.success')} ${this.$t('message.great_selected')}`)
      }))
  }

  successChoosen(index: number, itemSelected: ICardDataSource) {
    this.selectedCardValue[`${itemSelected.id}${index}`] = itemSelected
    this.$store.commit(MIRACEL_CARD_ACTION.SET_SELECT_CARD, index)
    this.celebrate()
  }

  celebrate() {
    for (let index = 0; index < 3; index++) {
      setTimeout(() => {
        const confetti = new ConfettiService(this.$refs.mysCardRef as HTMLDivElement)
        confetti.celebrate({
          particleCount: 4,
          angle: 90,
          spread: 55,
          origin: { x: 0, y: 1 },
        })
      }, 500)
    }
  }

  handleResizeChange() {
    if (!this.isNotEmptyData) {
      return
    }

    if (this.timer || this.timer !== null) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.calcSizeofCard()
    }, 500)
  }

  calcSizeofCard() {
    const cardWrapWidth = (this.cardWrapWidth = (this.$refs.mysCardRef as HTMLDivElement).clientWidth)

    for (const girdScreen of MIRACLE_RESPONSIVE) {
      if (cardWrapWidth > girdScreen.minWrapWidth && cardWrapWidth <= girdScreen.maxWrapWidth) {
        this.cardWidth = cardWrapWidth / girdScreen.screenCards - 16 // add more 8px
        this.cardHeight = this.cardWidth * this.ratioCard

        break // break for if find screen needed
      }
    }
  }

  mounted() {
    if (this.isNotEmptyData) {
      this.calcSizeofCard()
    }
  }

  created() {
    window.addEventListener('resize', this.handleResizeChange)
  }

  beforeUnmount() {
    window.removeEventListener('resize', this.handleResizeChange)
  }
}
</script>

<style lang="scss" scoped>
$cardHeight: 350px;

.card-module {
  margin: 2%;

  .img-box {
    flex-shrink: 0;
    text-align: center;
    box-sizing: border-box;
    position: relative;
    margin-left: 8px;
    margin-bottom: -8px;

    .img-item {
      object-fit: cover;
      width: 100%;
    }

    .front {
      box-sizing: border-box;
      position: absolute;
      transform: rotateY(180deg);
      backface-visibility: hidden;
      transform-style: preserve-3d;
      border: 1px solid #e8e8e8;
      border-radius: 7px;
      height: 92%;

      .content {
        height: 30%;
      }

      .image-top {
        border-bottom: 1px solid #e8e8e8;
      }

      .title_item {
        position: absolute;
        top: 15%;
        width: 100%;
        text-align: center;
        color: #460000;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 1;
        background-color: #fafbfdc2;
      }

      .subtitle_item {
        width: 100%;
        text-align: center;
        color: #460000e1;
        font-size: 15px;
      }

      .remark_item {
        position: absolute;
        top: 75%;
        left: 5%;
        width: 90%;
      }

      .img-item {
        filter: blur(0.9px);
        -webkit-filter: blur(0.9px);
      }
    }

    .back {
      background: none;
      box-sizing: border-box;
      position: absolute;
      transform: rotateY(0deg);
      backface-visibility: hidden;
      transform-style: preserve-3d;
      cursor: pointer;

      &:hover {
        transform: translate(0px, -5px);
        box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
      }

      .img-item {
        border-radius: 7px;
      }

      .back_title {
        position: absolute;
        top: 15px;
        width: 100px;
        margin: 0 auto;
        text-align: center;
        color: #ff6c00;
        font-size: 20px;
        font-weight: bold;
      }
    }

    &.active {
      animation: mymove 0.5s forwards;
      -webkit-animation: mymove 0.5s forwards;

      .front {
        transform: rotateY(0deg);
        transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1);
      }

      .back {
        transform: rotateY(180deg);
        transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1);
      }
    }
  }
}
</style>
