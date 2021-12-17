<template>
  <a-list class="demo-loadmore-list" :loading="loading" item-layout="horizontal" :data-source="miracleItems">
    <template v-if="miracleItems.length" #loadMore>
      <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-spin v-if="loadingMore" />
        <a-button v-else @click="loadMore">loading more</a-button>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a-dropdown-button>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1">
                  <UserOutlined />
                  Edit
                </a-menu-item>
                <a-menu-item key="2">
                  <UserOutlined />
                  Delete
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
        </template>
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <template #title>
            <a href="https://www.antdv.com/">{{ item.name.last }}</a>
          </template>
          <template #avatar>
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { IMiracle } from '@/shared/models/miracle'
import { Spin, List, ListItem, ListItemMeta, Avatar, Menu, MenuItem } from 'ant-design-vue'
@Options({
  components: {
    [Spin.name]: Spin,
    [List.name]: List,
    [ListItem.name]: ListItem,
    [ListItemMeta.name]: ListItemMeta,
    [Avatar.name]: Avatar,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
  },
  name: 'ms-miracle-items',
})
export default class MiracleItems extends Vue {
  @Prop({ default: () => [], type: Array }) miracleItems!: IMiracle[]

  loadingMore = false
  loading = false

  handleMenuClick() {}
}
</script>
