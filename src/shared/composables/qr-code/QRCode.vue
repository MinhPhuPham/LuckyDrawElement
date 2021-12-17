<template>
  <qrcode-vue :id="`qrblock-${key}`" :level="level" :value="value" :size="size" :ref="`qrcode-${key}`"></qrcode-vue>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import QrcodeVue from 'qrcode.vue'
import { Prop } from 'vue-property-decorator'

type levelQR = 'L' | 'M' | 'Q' | 'H'

@Options({
  components: { QrcodeVue },
})
export default class QRCode extends Vue {
  @Prop({ required: true, type: String }) key!: string
  @Prop({ default: 300, type: Number }) size!: number
  @Prop({ default: '', type: String }) url!: string
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

  copyBlobToClipboard(blob: ClipboardItemData) {
    // eslint-disable-next-line no-undef
    const clipboardItemInput = new ClipboardItem({
      'image/png': blob,
    })
    return navigator.clipboard
      .write([clipboardItemInput])
      .then(() => true)
      .catch(() => false)
  }

  downloadLink(name: string, href: string) {
    const a = document.createElement('a')
    a.download = name
    a.href = href
    document.body.append()
    a.click()
    a.remove()
  }
}
</script>
