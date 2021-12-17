<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  components: {},
})
export default class PlayWrapper extends Vue {
  created() {
    console.log('start check type')
  }
}
</script>
