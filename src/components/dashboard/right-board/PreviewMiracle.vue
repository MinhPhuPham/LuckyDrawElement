<template>
  <p>I am rendered</p>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  components: {},
  name: 'ms-preview',
})
export default class PreviewMiracle extends Vue {}
</script>
