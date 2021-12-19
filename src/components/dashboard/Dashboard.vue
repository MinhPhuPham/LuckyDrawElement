<template>
  <a-row>
    <a-col class="dashboard__left" :xs="0" :sm="0" :md="6" :lg="6" :xl="6">
      <ms-user-info></ms-user-info>
      <a-button @click="modalVisiable = true" block type="primary" size="large">
        <template #icon>
          <AppstoreAddOutlined />
        </template>
        <strong class="pl-1">Create miracle</strong>
      </a-button>

      <ms-miracle-items
        @onSelectMiracle="selectMiracle"
        @onDeleteItem="confirmDeleteMiracle"
        :miracleItems="miracles"
      />
    </a-col>
    <a-col class="dashboard__right" :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
      <template v-if="isMiraclesLoading">
        <div class="flex items-center justify-center w-full" style="height: 85vh">
          <a-spin size="large" />
        </div>
      </template>

      <template v-else>
        <template v-if="selectedMiracle && miracles.length">
          <ms-config-miracle @onDeleteItem="confirmDeleteMiracle" />
        </template>
        <template v-else-if="!selectedMiracle && miracles.length">
          <a-result title="Not selected yet" sub-title="Please select a miracle for the next action">
            <template #icon>
              <MehTwoTone />
            </template>
          </a-result>
        </template>
        <a-result
          v-if="!miracles.length && !selectedMiracle"
          title="You don't have any miracle items. Let's create new!"
        >
          <template #extra>
            <a-button @click="modalVisiable = true" key="console" type="primary">
              <strong>Create Now</strong>
            </a-button>
          </template>
        </a-result>
      </template>
    </a-col>
  </a-row>

  <MiracleModal v-if="modalVisiable" v-model:visible="modalVisiable" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Row, Col, Result, Spin } from 'ant-design-vue'
import { AppstoreAddOutlined, MehTwoTone, ExclamationCircleOutlined } from '@ant-design/icons-vue'

import { IMiracle } from '@/shared/models/miracle'

import asyncModal from '@/components/asyncCompoents/AsyncModal'
import UserInfo from '@/components/dashboard/left-board/UserInfo.vue'
import ConfigureMiracle from '@/components/dashboard/right-board/ConfigureMiracle.vue'
import MiracleItems from '@/components/dashboard/left-board/MiracleItems.vue'

import { MYSTERIES_ACTION } from '@/store/mysteries/actions'
import MysteriesSerivce from '@/services/mysteries'
import DatasourcesSerivce from '@/services/data-sources'
import { createVNode } from 'vue'
import { successNotification } from '@/helpers/notification'

@Options({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Result.name]: Result,
    [UserInfo.name]: UserInfo,
    [ConfigureMiracle.name]: ConfigureMiracle,
    [MiracleItems.name]: MiracleItems,
    [Spin.name]: Spin,
    MiracleModal: asyncModal.MiracleModal,
    AppstoreAddOutlined,
    MehTwoTone,
  },
  name: 'ms-dashboard',
})
export default class DashBoard extends Vue {
  modalVisiable = false

  get miracles() {
    return this.$store.getters.miracles
  }

  get selectedMiracle() {
    return this.$store.getters.miracle
  }

  get isMiraclesLoading() {
    return this.$store.getters.miracleLoading
  }

  async created() {
    // Fetch all miracles
    await new MysteriesSerivce(this.$database).loadPaginationMiracles()
  }

  async selectMiracle(item: IMiracle) {
    this.$store.dispatch(MYSTERIES_ACTION.SET_ITEM, item)

    // Get datasource info
    await new DatasourcesSerivce(this.$database, item.id).loadSingleDataSourceMiracle()

    // Set recently info
    new MysteriesSerivce(this.$database, item.id).setRecentlyAccess()
  }

  confirmDeleteMiracle(id: string) {
    this.$confirm({
      title: 'Do you want to delete this item?',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'All related data will clear too. Think again before delete',
      onOk: () => {
        return new MysteriesSerivce(this.$database, id).deleteMiracleItem().then((res) => {
          if (res) {
            successNotification(`${this.$t('message.success')} ${this.$t('message.delete_miracle')}`)
            this.removeOnStore(id)
          }
        })
      },
    })
  }

  removeOnStore(id: string) {
    this.$store.commit(MYSTERIES_ACTION.DELETE_ITEM, id)
    if (this.selectedMiracle.id === id) {
      this.$store.dispatch(MYSTERIES_ACTION.SET_ITEM, null)
    }
  }
}
</script>
