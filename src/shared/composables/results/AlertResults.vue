<template>
  <div
    class="inner-loader h-full w-full flex items-center justify-center"
    :style="{ width: `${refParent.clientWidth}px`, height: `${refParent.clientHeight}px` }"
    v-if="loading && refParent"
  >
    <Spin size="large" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Spin } from 'ant-design-vue'
import { Prop } from 'vue-property-decorator'

@Options({
  components: { Spin },
  name: 'ms-inner-load',
})
export default class InnerLoader extends Vue {
  @Prop({ default: false, type: Boolean }) loading!: boolean
  @Prop() refParent!: HTMLDivElement
}
</script>

<style lang="scss" scoped>
.inner-loader {
  position: absolute;
  background-color: #f9f9f9b3;
  z-index: 9;
}
</style>
