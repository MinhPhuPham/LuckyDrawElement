<template>
  <div class="flex flex-wrap">
    <div
      class="miracle-box relative flex flex-nowrap items-center"
      v-for="miracle in miracleTypes"
      :key="miracle.label"
      :class="{ selected: miracle.value === value }"
      @click="value = miracle.value"
    >
      <a-avatar :src="require(`@/assets/${miracle.image}.png`)" class="miracle-box__avatar" shape="square" :size="64">
      </a-avatar>
      <div class="miracle-box__title ml-1">{{ miracle.label }}</div>

      <CheckOutlined v-if="miracle.value === value" class="grow-1 text-right mr-1" :style="{ 'text-align': 'right' }" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { MIRACLE_DATA } from '@/shared/consts/miracle'

import { Avatar } from 'ant-design-vue'
import { UserOutlined, CheckOutlined } from '@ant-design/icons-vue'

@Options({
  components: {
    [Avatar.name]: Avatar,
    UserOutlined,
    CheckOutlined,
  },
  name: 'ms-miracle-select',
})
export default class MiracleSelect extends Vue {
  @Prop({ default: 1, type: Number }) modelValue!: number

  miracleTypes = MIRACLE_DATA

  get value() {
    return this.modelValue
  }

  set value(val: number) {
    this.$emit('update:modelValue', val)
  }
}
</script>

<style lang="scss" scoped>
.miracle-box {
  flex: calc((100% / 3) - 24px) 0;
  width: 100%;
  min-width: 200px;
  margin: 0 0.5rem 1rem 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }

  &__title {
    font-weight: bold;
  }

  &.selected {
    box-shadow: 0 0 0 0.2rem rgb(13 110 253 / 25%);
  }
}

@media screen and (max-width: 1200px) {
  .miracle-box {
    flex: calc((100% / 2) - 24px) 0;
  }
}

@media screen and (max-width: 600px) {
  .miracle-box {
    flex: calc(100% - 24px) 0;
  }
}
</style>
