<template>
  <div id="wheel" v-if="isNotEmpty" ref="wheelWrapRef">
    <div class="big-wheel-box">
      <wheel
        :width="`${sizeWheel}px`"
        :height="`${sizeWheel}px`"
        ref="childWheel"
        :prizeList="dataSources"
        @over="openNotification"
        v-if="sizeWheel"
      >
        <template v-slot:item="{ item }">
          <div class="prize-name">{{ item.name }}</div>
          <img
            class="prize-img"
            :src="item.url || require('@/assets/images/mys-wheel/bean_one.png')"
            style="border-radius: 5px"
          />
        </template>
      </wheel>

      <a-tooltip :destroyTooltipOnHide="true" placement="bottom" title="Click to play">
        <img class="btn-go" @click="go" :src="require('@/assets/images/mys-wheel/go.png')" />
      </a-tooltip>
    </div>
  </div>

  <ms-empty v-else />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import Wheel from '@/shared/composables/wheel/Wheel.vue'
import Empty from '@/shared/composables/empty/Empty.vue'
import { Tooltip } from 'ant-design-vue'
import { IWheelDataSource } from '@/shared/models/datasources'
import { Prop } from 'vue-property-decorator'

import ConfettiService from '@/helpers/confetti'

@Options({
  components: {
    [Wheel.name]: Wheel,
    [Tooltip.name]: Tooltip,
    [Empty.name]: Empty,
  },
  name: 'ms-wrap-wheel',
})
export default class MysteryWheel extends Vue {
  @Prop({ default: false, type: Boolean }) isPreview!: boolean

  get dataSources(): IWheelDataSource[] {
    return this.$store.getters.datasources
  }

  get isNotEmpty(): boolean {
    return !!this.dataSources.length
  }

  sizeWheel: number = 0

  isRunning = false

  go() {
    if (this.isRunning) {
      return
    }

    this.isRunning = true
    ;(this.$refs.childWheel as Wheel).rotate(Math.floor(Math.random() * this.dataSources.length))
  }

  mounted() {
    const wheelElement = this.$refs.wheelWrapRef as HTMLDivElement
    const widthWrap = wheelElement.clientWidth
    const heightWrap = wheelElement.clientHeight

    this.sizeWheel = widthWrap > heightWrap ? heightWrap / 1.2 : widthWrap / 1.5
  }

  openNotification(resourceSelected: IWheelDataSource) {
    if (this.isPreview) {
      this.celebrate()
    } else {
    }
  }

  celebrate() {
    this.isRunning = false

    for (let index = 0; index < 3; index++) {
      setTimeout(() => {
        const confetti = new ConfettiService(this.$refs.wheelWrapRef as HTMLDivElement)
        confetti.celebrate({
          particleCount: 4,
          angle: 90,
          spread: 55,
          origin: { x: 0, y: 1 },
        })
      }, 500)
    }
  }
}
</script>

<style lang="scss" scope>
#wheel {
  position: relative;
  overflow: hidden;
  min-height: 80vh;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%;
  .big-wheel-box {
    position: absolute;
    top: 1.7rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 0;
    background-image: url('~@/assets/images/mys-wheel/disk_bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    padding: 3.5rem;
    .prize-name {
      position: relative;
      //display: block;
      left: 0.13rem;
      right: 0.13rem;
      top: 2rem;
      //width: 0.1rem;
      //word-wrap:break-word;
      //word-break:normal;
      font-size: 1.5rem;
      font-weight: bolder;
      text-align: center;
      color: orange;
    }
    .prize-img {
      position: absolute;
      top: 5rem;
      left: 50%;
      transform: translateX(-50%);
      max-width: 5rem;
      max-height: 5rem;
    }
    .btn-go {
      position: absolute;
      top: 37%;
      left: 50%;
      transform: translateX(-50%);
      width: 20%;
      cursor: pointer;
    }
  }
}
</style>
