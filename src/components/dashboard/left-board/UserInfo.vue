<template>
  <div class="user-info flex p-1 items-center">
    <div class="user-info__avatar">
      <a-avatar shape="square" :src="userInfo.photoURL" :size="64">
        <template v-if="!userInfo.photoURL" #icon><UserOutlined /></template>
      </a-avatar>
    </div>
    <div class="user-info__content flex flex-column text-left">
      <h3 class="name">{{ userInfo.userInfo || 'User Name' }}</h3>
      <h5 class="contact-info">{{ userInfo.email || userInfo.phoneNumber || '' }}</h5>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Avatar } from 'ant-design-vue'
import { UserOutlined } from '@ant-design/icons-vue'
@Options({
  components: {
    [Avatar.name]: Avatar,
    UserOutlined,
  },
  name: 'ms-user-info',
})
export default class UserInfo extends Vue {
  get userInfo() {
    return this.$store.getters.userInfo
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  border-bottom: 1px solid rgba(229, 231, 235);
  &__content {
    margin-left: 1rem;

    .name {
      margin-bottom: 0.3rem;
    }

    .contact-info {
      color: grey;
    }
  }
}
</style>
