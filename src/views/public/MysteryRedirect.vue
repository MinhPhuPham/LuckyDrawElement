<template>
  <p></p>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  components: {},
})
export default class PlayWrapper extends Vue {
  created() {
    console.log('redirect calculator')
  }
}
</script>
