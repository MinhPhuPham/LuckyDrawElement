<template>
  <ms-header></ms-header>
  <a-result status="success" title="Thank for joined us! This link for resource was used!" :sub-title="content">
    <template #extra>
      <a-button key="console" @click="$goto('home')" type="primary"> Go Home </a-button>
    </template>
  </a-result>
  <ms-footer />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Result } from 'ant-design-vue'

import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { IDataSource } from '@/shared/models/datasources'
import dayjs from 'dayjs'
@Options({
  components: {
    [Result.name]: Result,
    [Header.name]: Header,
    [Footer.name]: Footer,
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
        this.content = `Selected: ${parser.name} - at ${dayjs(parser.selected?.dateSelected).format(
          'YYYY/MM/DD HH:mm:ss'
        )}`
      }
    }
  }
}
</script>
