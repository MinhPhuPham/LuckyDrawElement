<template>
  <a-modal class="login" :footer="null" v-model:visible="loginVisible">
    <div class="login__header">
      <img class="login__header-icon" src="@/assets/images/logo.png" />
      <h3 class="login__header-title">{{ $t('login.title') }}</h3>
    </div>

    <a-form class="login__form" layout="vertical" :model="loginForm" :rules="loginRules" ref="loginFormRef">
      <a-form-item name="email" label="Email">
        <a-input v-model:value="loginForm.email" :placeholder="$t('form.email')" />
      </a-form-item>
      <a-form-item name="password" label="Password">
        <a-input v-model:value="loginForm.password" :placeholder="$t('form.password')" />
      </a-form-item>
      <a-form-item class="login__form-action">
        <a-space class="w-full" :size="16" direction="vertical">
          <a-button block @click="submitForm" type="primary">{{ $t('action.submit') }}</a-button>
          <span class="block w-full text-center">or</span>
          <a-row :gutter="[16, 8]">
            <a-col :span="12">
              <a-button @click="loginWithGoogle" block type="primary">
                <template #icon>
                  <GooglePlusOutlined />
                </template>
                Google
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button block type="primary">
                <template #icon>
                  <FacebookOutlined />
                </template>
                Facebook
              </a-button>
            </a-col>
          </a-row>
        </a-space>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Modal, FormItem, Form, Input, Row, Col, Space } from 'ant-design-vue'
import { GooglePlusOutlined, FacebookOutlined } from '@ant-design/icons-vue'

import LoginMixin from '@/shared/mixins/LoginMixin.vue'
@Options({
  components: {
    [Modal.name]: Modal,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Row.name]: Row,
    [Col.name]: Col,
    [Space.name]: Space,
    GooglePlusOutlined,
    FacebookOutlined,
  },
  mixins: [LoginMixin],
})
export default class LoginFormModal extends Vue {
  testVisiable = false
  @Prop({ default: false, type: Boolean }) visible!: boolean

  get loginVisible() {
    return this.visible
  }

  set loginVisible(value: boolean) {
    this.$emit('visible', value)
  }

  loginForm = {
    email: '',
    password: '',
  }

  loginRules = {}

  created() {
    this.loginRules = {
      email: [
        { required: true, message: this.$t('message.require', { field_name: this.$t('form.email') }), trigger: 'blur' },
        {
          pattern: /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
          message: this.$t('message.format'),
          trigger: 'blur',
        },
      ],
      password: {
        required: true,
        message: this.$t('message.require', { field_name: this.$t('form.password') }),
        trigger: 'blur',
      },
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  &__header {
    text-align: center;

    &-icon {
      width: 25%;
      margin-bottom: 1rem;
      max-width: 100px;
    }
    &-title {
      font-size: 1.4rem;
    }
  }

  &__form {
    &-action {
    }
  }
}
</style>
