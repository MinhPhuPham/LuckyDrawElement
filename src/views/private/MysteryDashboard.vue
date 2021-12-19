<template>
  <div class="dashboard" v-if="isAuth">
    <ms-header :backIcon="null" subTitle="Hello! Let's create a game"></ms-header>
    <div class="dashboard__wrapper">
      <ms-dashboard></ms-dashboard>
    </div>
    <ms-footer />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { h } from 'vue'
import { Router } from 'vue-router'
import { checkAuth } from '@/services/users'

import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Dashboard from '@/components/dashboard/Dashboard.vue'

import { WarningOutlined } from '@ant-design/icons-vue'
import { localStorageCustom } from '@/helpers/localStorage'
import { User } from '@firebase/auth'
import { MYSTERIES_ACTION } from '@/store/mysteries/actions'
import DatasourcesSerivce from '@/services/data-sources'
import { IMiracle } from '@/shared/models/miracle'

@Options({
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer,
    [Dashboard.name]: Dashboard,
  },
})
export default class MysterDashboard extends Vue {
  async beforeRouteEnter(to: Router, from: Router, next: Function) {
    const user = await checkAuth()
    next((vm: MysterDashboard) => {
      user ? vm.setLastSelectedMiracle(user as User) : vm.doLoginAction()
    })
  }

  get isAuth() {
    return this.$store.getters.isAuth
  }

  setLastSelectedMiracle(user: User) {
    const lastMiracle = localStorageCustom.getItem(`selectedMiracle-${user.uid}`)
    if (lastMiracle) {
      const parser = JSON.parse(lastMiracle) as IMiracle
      this.$store.commit(MYSTERIES_ACTION.SET_ITEM, parser)
      new DatasourcesSerivce(this.$database, parser.id).loadSingleDataSourceMiracle()
    }
  }

  doLoginAction() {
    this.$notification.open({
      duration: 3,
      message: 'Need login to use this page',
      description: '',
      icon: h(WarningOutlined, { style: 'color: red' }),
    })
    this.$router.push({ name: 'home', query: { openLoginModal: 'true' } })
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/dashboard.scss';
</style>
