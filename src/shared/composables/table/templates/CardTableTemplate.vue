<template>
  {{ text }}
</template>

<script lang="ts">
import { IMiracleCard } from '@/shared/models/miracle'
import { VNode } from '@vue/runtime-core'
import { ColumnType } from 'ant-design-vue/lib/vc-table/interface'
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Options({
  components: {},
})
export default class CardTableTemplate extends Vue {
  @Prop() column!: ColumnType<IMiracleCard>
  @Prop({ default: '' }) text!: string
  @Prop() record!: VNode

  created() {
    // this.record.ke
  }
}
</script>
