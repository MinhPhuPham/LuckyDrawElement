<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    class="sticky-header"
    :title="$t('title')"
    :backIcon="backIcon"
    :sub-title="subTitle"
    @back="() => $router.go(-1)"
  >
    <template v-slot:extra>
      <div class="flex items-center">
        <slot name="left" />

        <a-radio-group v-model:value="$i18n.locale">
          <a-radio-button key="en" value="en-us"> English </a-radio-button>
          <a-radio-button key="ja" value="ja"> 日本 </a-radio-button>
        </a-radio-group>

        <slot name="right" />

        <a-dropdown class="ml-1" v-if="isAuth">
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1"> <DashboardOutlined /> Dashboard </a-menu-item>
              <a-menu-item key="2"> <LogoutOutlined /> Logout </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            <UserOutlined />
            {{ userInfo.userInfo || userInfo.email || userInfo.phoneNumber }}
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </div>
    </template>
  </a-page-header>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { DownOutlined, DashboardOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons-vue'
import { PageHeader, RadioGroup, RadioButton, Dropdown, Menu, MenuItem, Avatar } from 'ant-design-vue'
import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface'
import { getAuth, signOut } from 'firebase/auth'
@Options({
  components: {
    [PageHeader.name]: PageHeader,
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton,
    [Dropdown.name]: Dropdown,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [Avatar.name]: Avatar,
    DownOutlined,
    DashboardOutlined,
    LogoutOutlined,
    UserOutlined,
  },
  name: 'ms-header',
})
export default class Home extends Vue {
  @Prop({ default: true, type: Boolean }) backIcon!: boolean
  @Prop({ default: '', type: String }) subTitle!: string

  get isAuth() {
    return this.$store.getters.isAuth
  }

  get userInfo() {
    return this.$store.getters.userInfo
  }

  handleMenuClick(menuObject: MenuInfo) {
    switch (parseInt(menuObject.key as string)) {
      case 1:
        this.$goto('dashboard')
        break

      case 2:
        this.doLogOut()
        break
    }
  }

  doLogOut() {
    console.log('do sign out')

    const auth = getAuth()
    signOut(auth).then(() => {
      console.log('sign out')

      this.$goto('home')
    })
  }
}
</script>

<style lang="scss" scoped>
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: white;
}
</style>
