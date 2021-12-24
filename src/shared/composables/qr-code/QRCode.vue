<template>
  <div class="flex items-center">
    <qrcode-vue
      :id="`qrblock-${keyValue}`"
      :level="level"
      :value="urlParse"
      :size="size"
      :ref="`qrcode-${keyValue}`"
    ></qrcode-vue>
    <a-tooltip :title="$t(isCopied ? 'action.copied' : 'action.copy')" placement="right">
      <a-button class="ml-1" @click="copyBlobToClipboard" type="dashed" size="small">
        <template #icon>
          <CopyOutlined v-if="!isCopied" />
          <CheckOutlined v-else :style="{ color: '#1890ff' }" />
        </template>
      </a-button>
    </a-tooltip>
    <a-tooltip :title="$t(isDownloaded ? 'action.downloaded' : 'action.download_qr')" placement="right">
      <a-button class="ml-1" @click="downloadQR" type="dashed" size="small">
        <template #icon>
          <DownloadOutlined v-if="!isDownloaded" />
          <CheckOutlined v-else :style="{ color: '#1890ff' }" />
        </template>
      </a-button>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import QrcodeVue from 'qrcode.vue'
import { Tooltip } from 'ant-design-vue'
import { CopyOutlined, CheckOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { Prop } from 'vue-property-decorator'

type levelQR = 'L' | 'M' | 'Q' | 'H'

@Options({
  components: { QrcodeVue, CopyOutlined, CheckOutlined, DownloadOutlined, [Tooltip.name]: Tooltip },
  name: 'ms-qrcode',
})
export default class QRCode extends Vue {
  @Prop({ default: '', type: String }) url!: string
  @Prop({ required: true, type: String }) keyValue!: string
  @Prop({ default: 120, type: Number }) size!: number
  @Prop({ default: 'H', type: String }) level!: levelQR
  @Prop({ default: 'miracle-qr-code', type: String }) nameFile!: string

  isCopied = false
  isDownloaded = false

  get urlParse() {
    this.isCopied = false
    this.isDownloaded = false
    return this.url
  }

  copyBlobToClipboard() {
    const canvas = document.getElementById(`qrblock-${this.keyValue}`) as HTMLCanvasElement
    canvas.toBlob((blob) => {
      const item = new ClipboardItem({ 'image/png': blob })
      navigator.clipboard.write([item]).finally(() => {
        this.isCopied = true
      })
    })
  }

  downloadQR() {
    const canvas = document.getElementById(`qrblock-${this.keyValue}`) as HTMLCanvasElement
    const link = document.createElement('a')
    link.download = `link-play-${this.nameFile}`
    link.href = canvas.toDataURL()
    link.click()
    link.remove()
    this.isDownloaded = true
  }
}
</script>
