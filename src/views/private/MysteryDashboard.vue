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
      user ? vm.loadUserData() : vm.doLoginAction()
    })
  }

  get isAuth() {
    return this.$store.getters.isAuth
  }

  doLoginAction() {
    this.$router.push({ name: 'home', query: { openLoginModal: 'true' } })
    this.$notification.open({
      duration: 3,
      message: 'Need login to use this page',
      description: '',
      icon: h(WarningOutlined, { style: 'color: red' }),
    })
  }

  loadUserData() {
    // try {
    //   const docRef = await addDoc(collection(this.$database, 'users'), {
    //     first: 'Ada',
    //     last: 'Lovelace',
    //     born: 1815,
    //   })
    //   console.log('Document written with ID: ', docRef.id)
    // } catch (e) {
    //   console.error('Error adding document: ', e)
    // }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/dashboard.scss';
</style>
