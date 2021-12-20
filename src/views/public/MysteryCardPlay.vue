<template>
  <ms-header subTitle="Let's choose a card for becomes winner"></ms-header>
  <div class="h-85vh w-full" ref="cardsWrapper">
    <ms-card-screen :resourceSelected="resourceData" v-if="!initLoading && Object.keys(resourceData).length" />
    <ms-inner-load
      :refParent="$refs.cardsWrapper"
      :loading="initLoading || dataSourceLoading || miracleLoading"
    ></ms-inner-load>
  </div>
  <ms-footer />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import MysteryCardPlayScreen from '@/components/miracle-play/MysteryCardPlayScreen.vue'
import InnerLoader from '@/shared/composables/loader/InnerLoader.vue'
import DatasourcesSerivce from '@/services/data-sources'

@Options({
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer,
    [MysteryCardPlayScreen.name]: MysteryCardPlayScreen,
    [InnerLoader.name]: InnerLoader,
  },
})
export default class MysteryCardPlay extends Vue {
  initLoading = true
  resourceData = {}

  get isAuth() {
    return this.$store.getters.isAuth
  }

  get dataSourceLoading() {
    return this.$store.getters.dataSourceLoading
  }

  get miracleLoading() {
    return this.$store.getters.miracleLoading
  }

  async created() {
    const { userId, miracleId } = this.$route.params
    const { resourceId } = this.$route.query

    if (!userId || !miracleId || !resourceId) {
      return this.$goto('not_found')
    }

    const datasourceService = new DatasourcesSerivce(this.$database, miracleId as string, userId as string)

    const response = await datasourceService.checkCurrentDataResouce(resourceId as string)
    this.initLoading = false

    if (!response) {
      console.log('resouce not exist')
      return this.$goto('not_found')
    }

    const { isPlayed, data } = response
    if (isPlayed && !this.isAuth) {
      sessionStorage.setItem(`${miracleId}`, JSON.stringify(data))
      this.$goto('played_link')
      return
    }

    await datasourceService.loadSingleDataSourceMiracle(!this.isAuth, resourceId as string)
    this.resourceData = data
    sessionStorage.setItem('resourceChooseId', resourceId as string)
    sessionStorage.setItem('userId', userId as string)
  }
}
</script>
