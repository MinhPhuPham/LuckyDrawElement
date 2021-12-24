
<template>
  <ms-header subTitle="Let's choose a card for becomes winner"></ms-header>
  <div class="h-85vh w-full" ref="playWrapper">
    <router-view v-if="!initLoading"></router-view>
    <ms-inner-load :refParent="$refs.playWrapper" :loading="true" v-else></ms-inner-load>
  </div>
  <ms-footer />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import InnerLoader from '@/shared/composables/loader/InnerLoader.vue'

import DatasourcesSerivce from '@/services/data-sources'
import { IUser } from '@/shared/models/user'

@Options({
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer,
    [InnerLoader.name]: InnerLoader,
  },
})
export default class PlayWrapper extends Vue {
  initLoading = true

  get isAuth() {
    return this.$store.getters.isAuth
  }

  get userInfo(): IUser {
    return this.$store.getters.userInfo
  }

  async created() {
    const { userId, miracleId } = this.$route.params
    const { resourceId } = this.$route.query

    if (!userId || !miracleId) {
      return this.$goto('not_found')
    }

    if (this.isAuth && this.userInfo.uid === userId) {
      this.initLoading = false
      return this.$goto('result_view')
    }

    if (!resourceId) {
      return this.$goto('not_found')
    }

    const datasourceService = new DatasourcesSerivce(this.$database, miracleId as string, userId as string)
    const response = await datasourceService.checkCurrentDataResouce(resourceId as string)
    if (!response) {
      console.log('resouce not exist')
      this.initLoading = false
      return this.$goto('not_found')
    }

    const { isPlayed, data } = response

    if (isPlayed) {
      sessionStorage.setItem(`${miracleId}`, JSON.stringify(data))
      this.initLoading = false
      return this.$goto('played_link')
    }

    await datasourceService.loadSingleDataSourceMiracle(!this.isAuth, resourceId as string)

    this.initLoading = false
    sessionStorage.setItem('resourceChooseId', resourceId as string)
    sessionStorage.setItem('userId', userId as string)
  }
}
</script>
