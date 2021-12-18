<template>
  <ms-header subTitle="Let's choose a card for becomes winner"></ms-header>

  <ms-footer />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

@Options({
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer,
  },
})
export default class Home extends Vue {
  created() {
    console.log('reach to card')
  }
}
</script>
