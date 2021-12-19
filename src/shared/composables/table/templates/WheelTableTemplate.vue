<template>
  <p></p>
</template>

<script lang="ts">
import { IMiracleCard } from '@/shared/models/miracle'
import { ColumnType } from 'ant-design-vue/lib/table'
import { VNode } from 'vue'
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Options({
  components: {},
})
export default class WheelTemplate extends Vue {
  @Prop() column!: ColumnType<IMiracleCard>
  @Prop({ default: '' }) text!: string
  @Prop() record!: VNode
}
</script>
