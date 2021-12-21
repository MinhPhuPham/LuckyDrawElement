<template>
  <ms-header :backIcon="null"></ms-header>
  <p>Comming Soon</p>
  <ms-footer />
  <!-- <ms-datasource :isViewMode="true" v-if="selectedMiracle && isAuth && isOwnerMiracle" /> -->
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { h } from 'vue'
import { WarningOutlined } from '@ant-design/icons-vue'

import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

@Options({
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer,
  },
})
export default class MysteryResult extends Vue {
  get isAuth() {
    return this.$store.getters.isAuth
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

  async fetchData() {}

  async created() {
    this.isAuth ? this.fetchData() : this.doLoginAction()
  }
}
</script>
