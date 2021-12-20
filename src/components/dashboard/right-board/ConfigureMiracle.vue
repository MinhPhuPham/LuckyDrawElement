<template>
  <div class="miracle-settings bg-grey h-full">
    <div class="miracle-settings__toolbar bg-white flex items-center justify-between">
      <h3 class="mb-0">{{ selectedMiracle.title }}</h3>
      <div class="toolbar-actions flex items-center">
        <a-button @click="addPreviewTab" class="mr-1" type="dashed">
          <template #icon>
            <PlayCircleOutlined />
          </template>
          <span class="ml-1 text-medium">Play Preview</span>
        </a-button>
        <a-button @click="$emit('onDeleteItem', selectedMiracle.id)" type="primary" danger>
          <template #icon>
            <DeleteOutlined />
          </template>
          <span class="ml-1 text-medium">Delete</span>
        </a-button>
      </div>
    </div>
    <div class="miracle-settings__content h-full">
      <a-tabs
        class="miracle-settings__tabs"
        v-model:activeKey="activeKey"
        hide-add
        type="editable-card"
        @edit="removePreview"
      >
        <TabPane v-for="pane in panes" :key="pane.key" :closable="pane.closable">
          <template #tab>
            <component :is="pane.icon"></component>
            <span>{{ pane.title }}</span>
          </template>

          <component :is="pane.content"></component>
        </TabPane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { DeleteOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { Tabs, TabPane } from 'ant-design-vue'
import asyncTab from '@/components/asyncCompoents/AsyncTab'
import { markRaw, shallowRef } from '@vue/reactivity'
@Options({
  components: {
    [Tabs.name]: Tabs,
    TabPane,
    DeleteOutlined,
    PlayCircleOutlined,
  },
  name: 'ms-config-miracle',
})
export default class ConfigureMiracle extends Vue {
  get selectedMiracle() {
    return this.$store.getters.miracle
  }

  panes = [
    {
      title: 'Settings',
      content: shallowRef(asyncTab.InfoSettings),
      key: 1,
      icon: shallowRef(SettingOutlined),
      closable: false,
    },
  ]
  activeKey = 1

  addPreviewTab() {
    if (this.panes.length >= 2) {
      return
    }

    this.panes.push({
      title: 'Preview',
      content: markRaw(asyncTab.PreviewMiracle),
      key: 2,
      icon: PlayCircleOutlined,
      closable: true,
    })
    this.activeKey = 2
  }

  removePreview() {
    this.activeKey = 1
    this.panes.length = 1
  }
}
</script>

<style lang="scss" scoped>
.miracle-settings {
  &__toolbar {
    padding: 8px 12px;
  }
  &__content {
    width: 98%;
    margin: 0 auto;
  }

  &__tabs {
    margin-top: 0.5rem;
    height: 82vh;
  }
}
</style>

<style lang="scss">
.miracle-settings {
  &__tabs {
    .ant-tabs {
      &-content-holder {
        border: 1px solid #f0f0f0;
        border-top: none;
        overflow-x: auto;
        background-color: white;
        padding: 1rem 1rem 0 1rem;
      }

      &-nav {
        margin-bottom: 0;
      }
    }
  }
}
</style>
