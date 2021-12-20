<template>
  <div id="cloud_main" :class="{ mask: showResult }" @click="showResult = false"></div>
  <div>
    <div id="tags">
      <ul v-for="(item, index) in dataSources" :key="index">
        <li>
          <img v-if="item.url.length > 10" :src="item.url" :width="50" :height="50" style="border-radius: 5px" />
          <a href="javascript:void(0);" :style="nameStyle">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="action_group">
    <a-button
      class="action_b"
      type="primary"
      shape="round"
      size="large"
      :loading="isRunning"
      :disabled="isActive"
      @click="go()"
    >
      {{ $t('luckCloud.go') }}
    </a-button>
    <a-button
      icon="dashboard"
      type=""
      shape="round"
      size="large"
      :class="{ action_b: true, active: isActive, normal: !isActive }"
      :disabled="isRunning"
      @click="start"
    >
      {{ isActive ? $t('luckCloud.stop') : $t('luckCloud.start') }}
    </a-button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import '@/assets/js/tagCanvas.js'

import { IWheelDataSource } from '@/shared/models/datasources'
@Options({
  components: {},
  name: 'mys-cloud',
})
export default class MysterCloud extends Vue {
  visible = false
  showResult = false
  isRunning = false
  isActive = false
  allowRepeat = false
  winnerCount = 1
  nameStyle = { color: '#1890FF', fontSize: '15px' }
  normalSpeed = [0.1, 0.1]
  runSpeed = [2, 1]
  historyWinnerArr: IWheelDataSource[] = []
  currentWinnerArr: IWheelDataSource[] = []

  get dataSources(): IWheelDataSource[] {
    return this.$store.getters.datasources
  }

  go() {
    this.isRunning = true
    this.showResult = false
    // @ts-ignore
    window.TagCanvas.SetSpeed('my_canvas', this.runSpeed)

    setTimeout(() => {
      this.onDraw()
    }, 2000 * (this.winnerCount < 3 ? this.winnerCount : 3))
  }

  start() {
    this.isActive = !this.isActive
    this.showResult = false
    // @ts-ignore
    window.TagCanvas.SetSpeed('my_canvas', this.runSpeed)

    let interval = setInterval(() => {
      if (!this.isActive) {
        clearInterval(interval)
        this.onDraw()
        return
      }
    }, 77)
  }

  onDraw() {
    this.currentWinnerArr = []
    const tempArr = [...this.dataSources]
    for (let j = 0; j < this.winnerCount; j++) {
      let draws = tempArr
      // 剔除历史元素
      if (!this.allowRepeat) {
        draws = tempArr.filter((item) => !this.historyWinnerArr.includes(item))
        draws = draws.filter((item) => !this.currentWinnerArr.includes(item))
      }
      const index = Math.floor(Math.random() * draws.length + 1)
      const winner = draws[index - 1]
      this.currentWinnerArr.push(winner)
      this.historyWinnerArr.push(winner)
    }
    this.showResult = true
    this.isRunning = false
    // @ts-ignore
    window.TagCanvas.SetSpeed('my_canvas', this.normalSpeed)
  }

  onClick(checked: boolean) {
    this.allowRepeat = checked
  }

  onChange(value: number) {
    this.winnerCount = value
  }

  showDrawer() {
    this.visible = true
  }

  onClose() {
    this.visible = false
  }

  handleRandomItem() {
    // this.randomItem()
    // @ts-ignore
    window.TagCanvas.Reload('my_canvas')
    this.showResult = false
  }

  handleClearCache() {
    this.$confirm({
      title: this.$t('list.clCache'),
      content: this.$t('list.content'),
      okText: this.$t('list.okText'),
      okType: 'danger',
      cancelText: this.$t('list.cancelText'),
      onOk: () => {
        this.historyWinnerArr = []
        this.showResult = false
      },
    })
  }

  createCanvas() {
    const canvas = document.createElement('canvas')
    canvas.width = document.body.offsetWidth
    canvas.height = document.body.offsetHeight
    canvas.id = 'my_canvas'
    this.$el.querySelector('#cloud_main').appendChild(canvas)
  }

  setTagCanvas() {
    this.createCanvas()
    // @ts-ignore
    window.TagCanvas.Start('my_canvas', 'tags', {
      textColour: null,
      initial: this.normalSpeed,
      dragControl: 1,
      textHeight: 20,
      noSelect: true,
      lock: 'xy',
    })
  }
}
</script>


<style lang="scss" scope>
.mask {
  -webkit-filter: blur(5px);
  filter: blur(5px);
}

#cloud_main {
  width: 100%;
  height: 100%;
}

.action_s {
  background: #ff4d4f;
  margin-right: 10px;
}

.action_i {
  width: 100px;
}

.action_group {
  position: absolute;
  right: 10px;
  top: 40%;
  width: 120px;
  height: 30%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .action_b {
    width: 90%;
  }

  .active {
    color: white;
    background: #ff4d4f;
    border-color: lightgray;
  }

  .normal {
    color: #696969;
    background: white;
    border-color: lightgray;
  }
}

.result_alert {
  position: absolute;
  top: 25%;
  left: 20%;
  width: 60%;
  z-index: 10;
}
</style>
