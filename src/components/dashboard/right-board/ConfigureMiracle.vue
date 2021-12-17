<template>
  <!-- <ms-miracle-select v-model="miracleType" /> -->
  <p></p>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import MiracleSelect from '@/components/miracle/MiracleSelect.vue'
@Options({
  components: {
    [MiracleSelect.name]: MiracleSelect,
  },
  name: 'ms-config-miracle',
})
export default class ConfigureMiracle extends Vue {
  miracleType = 1
}
</script>
