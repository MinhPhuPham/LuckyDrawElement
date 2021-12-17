<template>
  <a-modal class="miracle" v-model:visible="miracleVisible">
    <div class="login__header">
      <h3 class="login__header-title">{{ $t('miracle.create') }}</h3>
    </div>

    <a-form class="login__form" layout="vertical" :model="loginForm" :rules="loginRules" ref="loginFormRef">
      <a-form-item name="email" label="Title">
        <a-input v-model:value="loginForm.email" :placeholder="$t('form.email')" />
      </a-form-item>
      <a-form-item name="password" label="Description">
        <a-input v-model:value="loginForm.password" :placeholder="$t('form.password')" />
      </a-form-item>
      <a-form-item class="login__form-action">
        <a-space class="w-full" :size="16" direction="vertical">
          <a-button @click="submitForm" type="primary">{{ $t('action.submit') }}</a-button>
          <span class="block w-full text-center">or</span>
        </a-space>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Modal, FormItem, Form, Input } from 'ant-design-vue'

@Options({
  components: {
    [Modal.name]: Modal,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
  },
})
export default class MiracleFormModal extends Vue {
  @Prop({ default: false, type: Boolean }) visible!: boolean

  get miracleVisible() {
    return this.visible
  }

  set miracleVisible(value: boolean) {
    this.$emit('visible', value)
  }

  miracleForm = {
    title: '',
    caption: '',
    miracleType: '',
  }
}
</script>
