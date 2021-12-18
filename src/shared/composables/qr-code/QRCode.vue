<template>
  {{ keyValue }}
  <qrcode-vue
    :id="`qrblock-${keyValue}`"
    :level="level"
    :value="value"
    :size="size"
    :ref="`qrcode-${keyValue}`"
  ></qrcode-vue>
  <button @click="copyBlobToClipboard">Click Copy</button>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import QrcodeVue from 'qrcode.vue'
import { Prop } from 'vue-property-decorator'

type levelQR = 'L' | 'M' | 'Q' | 'H'

@Options({
  components: { QrcodeVue },
  name: 'ms-qrcode',
})
export default class QRCode extends Vue {
  @Prop({ default: '', type: String }) url!: string
  @Prop({ required: true, type: String }) keyValue!: string
  @Prop({ default: 300, type: Number }) size!: number
  @Prop({ default: 'H', type: String }) level!: levelQR

  selectText(element: HTMLDivElement) {
    if (window.getSelection) {
      const selection = window.getSelection() as Selection
      const range = document.createRange()
      range.selectNodeContents(element)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  copyBlobToClipboardFirefox(href: string) {
    const img = document.createElement('img')
    img.src = href
    const div = document.createElement('div') as HTMLDivElement
    div.appendChild(img)
    document.body.appendChild(div)
    this.selectText(div)
    const done = document.execCommand('Copy')
    document.body.removeChild(div)
    return done
  }

  copyBlobToClipboard() {
    const canvas = document.getElementById(`qrblock-${this.keyValue}`) as HTMLCanvasElement
    canvas.toBlob((blob) => {
      const item = new ClipboardItem({ 'image/png': blob })
      navigator.clipboard
        .write([item])
        .then(() => true)
        .catch(() => false)
    })
  }
}
</script>
