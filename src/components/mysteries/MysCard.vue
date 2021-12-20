<template>
  <div class="card-module flex flex-wrap" ref="mysCardRef">
    <div
      v-for="(item, index) of dataSources"
      :class="['img-box', { active: item.isShow }]"
      :key="item.id + index"
      :style="{ width: `${cardWidth}px`, height: `${cardHeight}px` }"
      @click="handleClick(index)"
    >
      <div class="back">
        <a class="back_title">{{ $t('label.no_num') }}{{ index + 1 }}</a>
        <img class="img-item" :src="item.url || require('@/assets/images/mys-cards/project_card_bg.png')" />
      </div>
      <div class="front">
        <div class="image-top">
          <a class="title_item">{{ $t('label.mystery_card') }}</a>
          <img class="img-item" :src="item.cardFront || require('@/assets/images/mys-cards/card-front.png')" />
        </div>
        <div class="content">
          <a class="subtitle_item">{{ $t('label.mystery_card') }}</a>
        </div>
      </div>
    </div>
    <ms-inner-load :refParent="$refs.mysCardRef" :loading="dataSourceLoading" />
  </div>
</template>

<script lang="ts">
import { ICardDataSource } from '@/shared/models/datasources'
import { MIRACEL_CARD_ACTION } from '@/store/mysteries/actions'
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import InnerLoader from '@/shared/composables/loader/InnerLoader.vue'
import ConfettiService from '@/helpers/confetti'
import { MIRACLE_RESPONSIVE } from '@/shared/consts/miracle-card-responsive'
@Options({
  components: {
    [InnerLoader.name]: InnerLoader,
  },
  name: 'ms-cards',
})
export default class MysCardComponent extends Vue {
  @Prop({ default: false, type: Boolean }) isPreview!: boolean

  minCardWidth: number = 160
  maxCardWidth: number = 225

  ratioCard: number = 331 / 222
  cardWidth: number = 222
  cardHeight: number = this.cardWidth * this.ratioCard
  cardWrapWidth: number = 0

  timer: number | null = null

  get selectedCard(): ICardDataSource {
    return this.$store.getters.selectedDatasource
  }

  get dataSourceLoading() {
    return this.$store.getters.dataSourceLoading
  }

  get emptyData() {
    return this.dataSources.length
  }

  get dataSources(): ICardDataSource[] {
    return this.isPreview ? this.$store.getters.datasources : this.$store.getters.cardDatasourcesRandom
  }

  async handleClick(index: number) {
    if (this.isPreview) {
      this.$store.commit(MIRACEL_CARD_ACTION.SET_SELECT_CARD, index)
    }

    this.celebrate()
  }

  getTextCard(cardId: string, isTitle = true) {
    if (this.selectedCard?.id === cardId) {
      return isTitle ? this.selectedCard.name : this.selectedCard.subtitle
    }

    return this.$t('label.mystery_card')
  }

  celebrate() {
    console.log('SelectCard::celebrate')
    const confetti = new ConfettiService(this.$refs.mysCardRef as HTMLDivElement)
    confetti.celebrate()
  }

  handleResizeChange() {
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
    this.calcSizeofCard()
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
