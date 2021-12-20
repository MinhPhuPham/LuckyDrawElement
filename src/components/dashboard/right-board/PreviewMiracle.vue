<template>
  <div class="play-previews">
    <div class="play-previews__top">
      <component :is="asyncTemplates[selectedMiracleType]" :isPreview="true"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { ASYNC_TEMPLATE } from '@/shared/consts/mysteries-play'
import { IMiracle } from '@/shared/models/miracle'
@Options({
  components: {},
  name: 'ms-preview',
})
export default class PreviewMiracle extends Vue {
  get selectedMiracle(): IMiracle {
    return this.$store.getters.miracle
  }

  get selectedMiracleType() {
    return this.selectedMiracle?.type
  }

  asyncTemplates = ASYNC_TEMPLATE
}
</script>
