<template>
  {{ sizeWheel }}
  <div class="__big-wheel" ref="bigWheel" :style="{ width, height }">
    <div class="wrap" :style="{ transform: rotateAngle, transition: rotateTransition }">
      <canvas id="canvas" ref="canvas">Browser version is too low</canvas>
      <div class="prize-wrap">
        <div class="item" v-for="(item, index) in prizeList" :key="index" :style="_calcRotateAngle(index)">
          <slot name="item" :item="item" />
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IWheelDataSource } from '@/shared/models/datasources'
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Options({
  components: {},
  name: 'wheel',
})
export default class Wheel extends Vue {
  // Start the angle of rotation
  startRotateDegree = 0

  // Set the pointer default position, now is the default point to 1 fan shape, set to 0, point between two sectors
  rotateAngle = 'rotate(30deg)'

  rotateTransition = ''

  @Prop({ required: true, type: Array }) prizeList!: Array<IWheelDataSource>
  @Prop({ required: true, type: String }) width!: string
  @Prop({ required: true, type: String }) height!: string

  // Each sector background color, circulation padding
  @Prop({ default: () => ['#F52D4B', '#FEE9ED'], type: Array }) prizeBgColors!: Array<string>

  // Each piece of fan-shaped frame color
  @Prop({ default: '#F23544', type: String }) borderColor!: string

  // number of turns
  @Prop({ default: 5, type: Number }) turnsNumber!: number

  // Turn duration (seconds)
  @Prop({ default: 5, type: Number }) turnsTime!: number

  get refCanvas() {
    return this.$refs.canvas as HTMLCanvasElement
  }

  get refBigWheel() {
    return this.$refs.bigWheel as HTMLElement
  }

  // Initialize Canvas
  initData() {
    const prizeNum = this.prizeList.length
    const prizeBgColors = this.prizeBgColors
    const borderColor = this.borderColor
    // painting
    const ctx = this.refCanvas.getContext('2d') as CanvasRenderingContext2D
    const canvasW = (this.refCanvas.width = this.refBigWheel.clientWidth) // Height of the drawing board
    const canvasH = (this.refCanvas.height = this.refBigWheel.clientHeight) // Painting board width

    // translate Method Remaps the canvas (0,0) Location
    ctx.translate(0, canvasH)

    // Rotate method rotates the current drawing because the text is vertical with the current sector center line
    ctx.rotate((-90 * Math.PI) / 180)

    // Ring radius of the ring,Can be used to adjust the size of the disc to accommodate the size of the external box
    const outRadius = canvasW / 2 - 1

    const innerRadius = 0 // Ring radius

    const baseAngle = (Math.PI * 2) / prizeNum // A number of angles per award

    ctx.clearRect(0, 0, canvasW, canvasH) // Remove the background default color

    ctx.strokeStyle = borderColor // Set the color of the drawing line

    let prizeBgColorsIndex = -1
    for (let index = 0; index < prizeNum; index++) {
      const angle = index * baseAngle

      // Set the background color of each sector area, loop fill
      prizeBgColorsIndex++
      ctx.fillStyle = prizeBgColors[prizeBgColorsIndex]
      if (prizeBgColorsIndex === prizeBgColors.length - 1) {
        prizeBgColorsIndex = -1
      }

      ctx.beginPath() // Start to draw
      // Standard arc: arc(x,y,radius,startAngle,endAngle,anticlockwise)
      ctx.arc(canvasW * 0.5, canvasH * 0.5, outRadius, angle, angle + baseAngle, false)
      ctx.arc(canvasW * 0.5, canvasH * 0.5, innerRadius, angle + baseAngle, angle, true)
      ctx.stroke()
      ctx.fill()
      ctx.save()
    }
  }

  /**
   * Disc rotation method
   * @param {number} index - Prize serial number
   */
  rotate(index: number) {
    const turnsTime = this.turnsTime
    const rotateAngle =
      this.startRotateDegree +
      this.turnsNumber * 360 +
      360 -
      (180 / this.prizeList.length + (360 / this.prizeList.length) * index) -
      (this.startRotateDegree % 360)
    this.startRotateDegree = rotateAngle
    this.rotateAngle = `rotate(${rotateAngle}deg)`
    this.rotateTransition = `transform ${turnsTime}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`
    setTimeout(() => {
      this.$emit('over', this.prizeList[index])
    }, turnsTime * 1000 + 500)
  }

  // Calculate each prize fan-shaped angle style according to INDEX
  _calcRotateAngle(index: number) {
    const angle = (360 / this.prizeList.length) * index + 180 / this.prizeList.length
    return {
      transform: `rotate(${angle}deg)`,
    }
  }

  mounted() {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
.__big-wheel {
  position: relative;
  display: inline-block;
  .wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    .prize-wrap {
      position: absolute;
      left: 25%;
      top: 0;
      width: 50%;
      height: 50%;
      .item {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform-origin: center bottom;
      }
    }
  }
}
</style>
