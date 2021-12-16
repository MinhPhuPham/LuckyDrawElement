<template>
  <ms-header :backIcon="null" subTitle="Opp! Back To Home" />
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button @click="$goto('home')" type="primary">Back Home</a-button>
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
export default class NotFound extends Vue {}
</script>
