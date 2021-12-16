<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    :title="$t('title')"
    :backIcon="backIcon"
    :sub-title="subTitle"
    @back="() => $router.go(-1)"
  >
    <template v-slot:extra>
      <div class="flex items-center">
        <slot name="left" />
        <a-radio-group v-model:value="$i18n.locale">
          <a-radio-button key="en" value="en-us"> English </a-radio-button>
          <a-radio-button key="ja" value="ja"> 日本 </a-radio-button>
        </a-radio-group>
        <slot name="right" />
      </div>
    </template>
  </a-page-header>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { PageHeader, RadioGroup, RadioButton } from 'ant-design-vue'
@Options({
  components: {
    [PageHeader.name]: PageHeader,
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton,
  },
  name: 'ms-header',
})
export default class Home extends Vue {
  @Prop({ default: true, type: Boolean }) backIcon!: boolean
  @Prop({ default: '', type: String }) subTitle!: string
}
</script>
