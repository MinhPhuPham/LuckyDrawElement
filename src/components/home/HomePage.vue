<template>
  <div class="wrap-content">
    <img class="wrap-content__icon" src="@/assets/images/logo.png" />
    <h1 class="wrap-content__title">{{ $t('home.title') }}</h1>
    <p class="wrap-content__caption">{{ $t('home.msg') }}</p>

    <a-button v-if="!isAuth" @click="modalVisiable = true" type="primary" shape="round" size="large">
      <template #icon>
        Login Now
        <LoginOutlined />
      </template>
    </a-button>

    <a-button @click="$goto('dashboard')" type="primary" shape="round" size="large">
      <template #icon>
        Go to Dashboard
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
