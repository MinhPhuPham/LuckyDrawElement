<template>
  <div class="wrap-content">
    <img class="wrap-content__icon" src="@/assets/images/logo.png" />
    <h1 class="wrap-content__title">{{ $t('home.title') }}</h1>
    <p class="wrap-content__caption">{{ $t('home.msg') }}</p>

    <a-button @click="modalVisiable = true" type="primary" shape="round" size="large">
      <template #icon>
        Login Now
        <LoginOutlined />
      </template>
    </a-button>
  </div>

  <LoginFormModal v-model:visible="modalVisiable" @visible="modalVisiable = false" />
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
