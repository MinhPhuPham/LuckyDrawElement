<template>
  <a-result status="success" title="Thank for joined us! This link for resource used!" :sub-title="content">
    <template #extra>
      <a-button key="console" @click="$goto('home')" type="primary"> Go Home </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Result } from 'ant-design-vue'

import { IDataSource } from '@/shared/models/datasources'
import { convertUnixToDatetime } from '@/helpers/date'
@Options({
  components: {
    [Result.name]: Result,
  },
})
export default class PlayWrapper extends Vue {
  content = ''
  created() {
    const { miracleId } = this.$route.params

    if (miracleId) {
      const result = sessionStorage.getItem(miracleId as string)
      if (result) {
        const parser = JSON.parse(result) as IDataSource
        this.content = `This link of ${parser.name} selected: ${parser.selected?.name} - at ${convertUnixToDatetime(
          parser.selected?.dateSelected as number
        )}`
      }
    }
  }
}
</script>
