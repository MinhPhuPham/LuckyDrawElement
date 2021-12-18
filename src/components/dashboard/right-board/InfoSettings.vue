<template>
  <label class="label-h3 text-unline">Infomation</label>
  <ms-miracle-form layout="horizontal" :miracleFormData="selectedMiracle" ref="miraInfoUpdateForm" />
  <div class="w-full text-right">
    <a-button @click="updateSelectedMiracle" type="primary">
      <template #icon>
        <SaveOutlined />
      </template>
      <span class="ml-1 text-medium">Save</span>
    </a-button>
  </div>

  <label class="label-h3 text-unline">DataSource</label>
  <ms-datasource />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import MiracleInfoForm from '@/components/miracle/forms/MiracleInfoForm.vue'
import DataSourceTable from '@/shared/composables/table/DataSourceTable.vue'
import { SaveOutlined } from '@ant-design/icons-vue'
@Options({
  components: {
    [MiracleInfoForm.name]: MiracleInfoForm,
    [DataSourceTable.name]: DataSourceTable,
    SaveOutlined,
  },
  name: 'ms-info-setting',
})
export default class Home extends Vue {
  get selectedMiracle() {
    return this.$store.getters.miracle
  }

  updateSelectedMiracle() {}
}
</script>
