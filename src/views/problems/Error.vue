<template>
  <ms-header :backIcon="null" subTitle="Opp! Back To Home" />
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <a-button type="primary">Back to Home</a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Result } from 'ant-design-vue'
import Header from '@/components/layout/Header.vue'
@Options({
  components: {
    [Result.name]: Result,
    [Header.name]: Header,
  },
})
export default class Erorr extends Vue {}
</script>
