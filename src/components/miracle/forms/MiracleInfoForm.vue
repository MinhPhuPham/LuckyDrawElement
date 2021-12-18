<template>
  <a-form
    class="miracle__form"
    :layout="layout"
    v-bind="formItemLayout"
    :model="miracleForm"
    :rules="miracleRules"
    ref="miracleFormRef"
  >
    <a-form-item name="title" label="Title">
      <a-input v-model:value="miracleForm.title" :placeholder="$t('placeholder.title')" />
    </a-form-item>
    <a-form-item name="description" label="Description">
      <a-textarea
        v-model:value="miracleForm.description"
        :placeholder="$t('placeholder.description')"
        :auto-size="{ minRows: 2 + increaseRow, maxRows: 5 + increaseRow }"
      />
    </a-form-item>
    <a-form-item name="type" label="Type of Miracle">
      <ms-miracle-select v-model="miracleForm.type" />
    </a-form-item>
    <slot />
  </a-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import cloneDeep from 'lodash/cloneDeep'
import { IMiracle } from '@/shared/models/miracle'

import { FormItem, Form, Input, Textarea } from 'ant-design-vue'
import MiracleSelect from '@/components/miracle/MiracleSelect.vue'

import MiracleService from '@/services/mysteries'
import { successNotification } from '@/helpers/notification'

@Options({
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Textarea.name]: Textarea,
    [MiracleSelect.name]: MiracleSelect,
  },
  name: 'ms-miracle-form',
})
export default class MiraInfoForm extends Vue {
  @Prop() miracleFormData!: IMiracle
  @Prop({ default: 'vertical', type: String }) layout!: string
  miracleRules = {}

  get increaseRow() {
    return !!this.miracleFormData ? 0 : 2
  }

  get formItemLayout() {
    return this.layout === 'horizontal'
      ? {
          labelCol: { span: 3 },
          wrapperCol: { span: 21 },
        }
      : {}
  }

  @Watch('miracleFormData', { deep: true, immediate: true })
  onFormDataChange() {
    if (this.miracleFormData) {
      this.miracleForm = { ...this.miracleFormData, ...cloneDeep(this.miracleFormData) }
    }
  }

  miracleForm = {
    title: '',
    description: '',
    type: 1,
  }

  get miracleFormRef() {
    // eslint-disable-next-line
    return this.$refs.miracleFormRef as any
  }

  createMiracle() {
    this.miracleFormRef.validate().then(async () => {
      // Miracle add function
      await new MiracleService(this.$database).addMiracleItem(this.miracleForm).then((res) => {
        if (res) {
          successNotification(`${this.$t('message.success')} ${this.$t('message.create_miracle')}`)
          this.$emit('createdMiracle')
        }
      })
    })
  }

  created() {
    this.miracleRules = {
      title: {
        required: true,
        message: this.$t('message.require', { field_name: this.$t('label.title') }),
        trigger: 'blur',
      },
    }
  }
}
</script>
