<template>
  <div class="flex items-center justify-center w-full h-100h">
    <a-spin size="large" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Spin } from 'ant-design-vue'
@Options({
  components: {
    [Spin.name]: Spin,
  },
  name: 'ms-loader',
})
export default class FullPageLoader extends Vue {}
</script>
