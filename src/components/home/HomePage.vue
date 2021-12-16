<template>
  <img class="icon_i" src="@/assets/images/logo.png" />
  <h1>{{ $t('home.title') }}</h1>
  <p>{{ $t('home.msg') }}</p>

  <a-button type="primary" shape="round" :size="size">
    <template #icon>
      Login Now
      <LoginOutlined />
    </template>
  </a-button>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { LoginOutlined } from '@ant-design/icons-vue'

@Options({
  components: { LoginOutlined },
  name: 'home-page',
})
export default class Home extends Vue {}
</script>

<style scoped>
.icon_i {
  width: 20%;
  min-width: 200px;
  max-width: 300px;
  height: 20%;
  margin: 20px auto;
}
</style>
