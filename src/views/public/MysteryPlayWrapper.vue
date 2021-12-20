<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  components: {},
})
export default class PlayWrapper extends Vue {}
</script>
