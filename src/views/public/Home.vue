<template>
  <ms-header :backIcon="false"></ms-header>
  <ms-home></ms-home>
  <ms-footer />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import HomePage from '@/components/home/HomePage.vue'

@Options({
  components: {
    [Header.name]: Header,
    [HomePage.name]: HomePage,
    [Footer.name]: Footer,
  },
})
export default class Home extends Vue {
  async created() {}
}
</script>
