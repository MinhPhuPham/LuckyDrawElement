<template>
  <template v-if="['name', 'subtitle'].includes(column.dataIndex)">
    <a-input
      v-if="editableData[record.id]"
      v-model:value="editableData[record.id][column.dataIndex]"
      style="margin: -5px 0"
      :ref="`nameInput${record.id}`"
    />
    <template v-else>
      {{ text }}
    </template>
  </template>
  <template v-else-if="column.key === 'isPlayed'"> </template>
  <template v-else-if="column.key === 'link'">
    <ms-qrcode v-if="false" level="L" :url="text" :keyValue="text" />
    <TypographyParagraph v-else code :copyable="{ text }"> Click copy </TypographyParagraph>
  </template>
  <template v-else-if="column.key === 'action'">
    <span v-if="editableData[record.id]">
      <a @click="$emit('save', record.id)">Save</a>
      <a-popconfirm title="Sure to cancel?" @confirm="$emit('cancel', record.id)">
        <a>Cancel</a>
      </a-popconfirm>
    </span>
    <span v-else>
      <a @click="$emit('edit', record.id)">Edit</a>
    </span>
  </template>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { ColumnType } from 'ant-design-vue/lib/vc-table/interface'
import { Input, Popconfirm, TypographyParagraph } from 'ant-design-vue'
import QRCode from '@/shared/composables/qr-code/QRCode.vue'

import { IMiracleCard } from '@/shared/models/miracle'
import { IDataSource } from '@/shared/models/datasources'

@Options({
  components: {
    [QRCode.name]: QRCode,
    [Input.name]: Input,
    [Popconfirm.name]: Popconfirm,
    TypographyParagraph,
  },
  emits: ['edit', 'save', 'cancel'],
})
export default class CardTemplate extends Vue {
  @Prop() column!: ColumnType<IMiracleCard>
  @Prop({ default: '' }) text!: string
  @Prop() record!: IDataSource
  @Prop() editableData!: Object

  mounted() {
    if (this.column.dataIndex === 'name') {
      ;(this.$refs[`nameInput${this.record?.id}`] as HTMLInputElement).focus()
    }
  }
}
</script>
