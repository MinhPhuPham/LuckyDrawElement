<template>
  <Empty :src="emptyImage">
    <template #description>
      <span>
        {{ message || 'Can\t find any data. Please check again' }}
      </span>
    </template>
    <slot />
  </Empty>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Empty } from 'ant-design-vue'
import { Prop } from 'vue-property-decorator'

@Options({
  components: {
    Empty,
  },
  name: 'ms-empty',
})
export default class EmptyComposable extends Vue {
  @Prop({ default: '', type: String }) emptyImage!: string
  @Prop({ default: '', type: String }) message!: string
}
</script>
