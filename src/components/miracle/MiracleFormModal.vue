<template>
  <a-modal
    :width="580"
    :cancelText="$t('action.cancel')"
    :okText="$t('action.save')"
    @ok="submitForm"
    class="miracle"
    v-model:visible="miracleVisible"
  >
    <div class="miracle__header">
      <h3 class="miracle__header-title">{{ $t('miracle.create') }}</h3>
    </div>

    <a-form class="miracle__form" layout="vertical" :model="miracleForm" :rules="miracleRules" ref="miracleFormRef">
      <a-form-item name="title" label="Title">
        <a-input v-model:value="miracleForm.title" :placeholder="$t('placeholder.title')" />
      </a-form-item>
      <a-form-item name="description" label="Description">
        <a-textarea v-model:value="miracleForm.description" :placeholder="$t('placeholder.description')" :rows="4" />
      </a-form-item>
      <a-form-item name="type" label="Type of Miracle">
        <ms-miracle-select v-model="miracleForm.type" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Modal, FormItem, Form, Input, Textarea } from 'ant-design-vue'
import MiracleSelect from '@/components/miracle/MiracleSelect.vue'

import MiracleService from '@/services/mysteries'

@Options({
  components: {
    [Modal.name]: Modal,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Textarea.name]: Textarea,
    [MiracleSelect.name]: MiracleSelect,
  },
})
export default class MiracleFormModal extends Vue {
  @Prop({ default: false, type: Boolean }) visible!: boolean

  get miracleVisible() {
    return this.visible
  }

  set miracleVisible(value: boolean) {
    this.$emit('update:visible', value)
  }

  miracleRules = {}

  miracleForm = {
    title: '',
    description: '',
    type: 1,
  }

  get miracleFormRef() {
    // eslint-disable-next-line
    return this.$refs.miracleFormRef as any
  }

  submitForm() {
    this.miracleFormRef.validate().then(() => {
      // Miracle add function
      new MiracleService(this.$database).addMiracleItem(this.miracleForm)
      this.miracleVisible = false
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
