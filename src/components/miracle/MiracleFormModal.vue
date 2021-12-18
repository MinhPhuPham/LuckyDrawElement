<template>
  <a-modal
    :width="696"
    :cancelText="$t('action.cancel')"
    :okText="$t('action.save')"
    @ok="submitForm"
    class="miracle"
    v-model:visible="miracleVisible"
  >
    <div class="miracle__header">
      <h3 class="miracle__header-title">{{ $t('miracle.create') }}</h3>
    </div>

    <ms-miracle-form ref="miraInfoForm" @createdMiracle="miracleVisible = false" />
  </a-modal>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Modal } from 'ant-design-vue'
import MiracleInfoForm from '@/components/miracle/forms/MiracleInfoForm.vue'

@Options({
  components: {
    [Modal.name]: Modal,
    [MiracleInfoForm.name]: MiracleInfoForm,
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

  submitForm() {
    ;(this.$refs.miraInfoForm as MiracleInfoForm).createMiracle()
  }
}
</script>
