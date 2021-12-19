<template>
  <div class="wrap-content text-center">
    <img class="wrap-content__icon" src="@/assets/images/logo.png" />
    <h1 class="wrap-content__title text-medium">{{ $t(isAuth ? 'home.greetings' : 'home.title') }}</h1>
    <p class="wrap-content__caption" v-if="!isAuth">{{ $t('home.msg') }}</p>

    <a-button v-if="!isAuth" @click="modalVisiable = true" type="primary" shape="round" size="large">
      <template #icon>
        <span class="mr-1">{{ $t('home.login_now') }}</span>
        <LoginOutlined />
      </template>
    </a-button>

    <a-button v-else @click="$goto('dashboard')" type="primary" shape="round" size="large">
      <template #icon>
        <span class="mr-1">{{ $t('home.go_dashboard') }}</span>
        <LoginOutlined />
      </template>
    </a-button>
  </div>

  <LoginFormModal v-if="!isAuth && modalVisiable" v-model:visible="modalVisiable" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { LoginOutlined } from '@ant-design/icons-vue'
import LoginFormModal from '@/components/auth/LoginFormModal.vue'

@Options({
  components: { LoginOutlined, LoginFormModal },
  name: 'ms-home',
})
export default class Home extends Vue {
  modalVisiable = false

  get isAuth() {
    return this.$store.getters.isAuth
  }

  get userInfo() {
    return this.$store.getters.userInfo
  }

  created() {
    this.modalVisiable = !!this.$route.query.openLoginModal
    console.log(process.env.NODE_ENV)
  }
}
</script>

<style lang="scss" scoped>
.wrap-content {
  min-height: 85vh;

  &__icon {
    width: 20%;
    min-width: 160px;
    max-width: 300px;
    height: 20%;
    margin: 20px auto;
  }

  &__title {
    margin-top: 1rem;
  }

  &__caption {
    margin-bottom: 1.5rem;
  }
}
</style>
