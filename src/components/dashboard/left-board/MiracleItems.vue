<template>
  <a-list
    v-if="!isMiraclesLoading"
    class="miracle-vertical"
    :loading="loading"
    item-layout="horizontal"
    :data-source="miracleItems"
  >
    <template #renderItem="{ item }">
      <a-list-item :class="{ active: item.id === selectedMiracleId }" @click="$emit('onSelectMiracle', item)">
        <template #actions>
          <a-dropdown-button class="miracle-item-btn">
            <template #overlay>
              <a-menu @click="handleMenuClick($event, item)">
                <a-menu-item key="1">
                  <EditTwoTone />
                  <span class="ml-1">Transfer(copy) Data</span>
                </a-menu-item>
                <a-menu-item key="2">
                  <DeleteTwoTone two-tone-color="#eb2f96" />
                  <span class="ml-1">Delete</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
        </template>
        <a-list-item-meta class="text-left" :description="item.description">
          <template #title>
            <a>{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar shape="square" size="large" :src="require(`@/assets/${miracleTypes[item.type].image}.png`)" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  <template v-else>
    <a-skeleton
      v-for="index in Array(6)"
      :key="index"
      class="miracle-vertical-skeleton"
      active
      avatar
      shape="square"
      :paragraph="{ rows: 1 }"
    />
  </template>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { IMiracle } from '@/shared/models/miracle'
import { Spin, List, ListItem, ListItemMeta, Avatar, Menu, MenuItem, DropdownButton, Skeleton } from 'ant-design-vue'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons-vue'
import { MIRACLE_DATA } from '@/shared/consts/miracle'
import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface'

@Options({
  components: {
    [Spin.name]: Spin,
    [List.name]: List,
    [ListItem.name]: ListItem,
    [ListItemMeta.name]: ListItemMeta,
    [Avatar.name]: Avatar,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [DropdownButton.name]: DropdownButton,
    [Skeleton.name]: Skeleton,
    EditTwoTone,
    DeleteTwoTone,
  },
  emits: ['onSelectMiracle', 'onDeleteItem'],
  name: 'ms-miracle-items',
})
export default class MiracleItems extends Vue {
  @Prop({ default: () => [], type: Array }) miracleItems!: IMiracle[]

  loadingMore = false
  loading = false
  miracleTypes = MIRACLE_DATA

  get selectedMiracleId() {
    return this.$store.getters.miracle?.id
  }

  get isMiraclesLoading() {
    return this.$store.getters.miracleLoading
  }

  handleMenuClick(menuObject: MenuInfo, item: IMiracle) {
    switch (parseInt(menuObject.key as string)) {
      case 1:
        this.$emit('onSelectTransfer', item)
        break

      case 2:
        this.$emit('onDeleteItem', item.id)
        break
    }
  }
}
</script>

<style lang="scss">
.miracle-vertical {
  .ant-list-items {
    max-height: 74vh;
    overflow-x: auto;

    .ant-list-item {
      cursor: pointer;
      border-radius: 2px;

      &.active {
        border: 1px solid #1890ff;
      }

      &:hover:not(.active) {
        border: 1px solid #e4e4fa;
      }

      &-action {
        margin-left: 0px;
      }

      &-meta-avatar {
        margin-left: 8px;
        margin-right: 12px;
      }
    }
  }
}

.miracle-vertical-skeleton {
  margin-bottom: 6px;
  border-bottom: 1px solid #f0f0f0;

  .ant-skeleton {
    &-header {
      padding-right: 12px;
      padding-left: 8px;
    }

    &-content {
      padding-right: 12px;

      .ant-skeleton-paragraph {
        margin-top: 12px !important;
      }

      .ant-skeleton-title {
        margin-top: 8px;
      }
    }
  }
}

.miracle-item-btn {
  .ant-btn.ant-dropdown-trigger {
    span {
      vertical-align: bottom;
    }
    border-radius: 50px !important;
  }
}
</style>
