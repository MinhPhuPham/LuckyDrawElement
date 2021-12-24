<template>
  <div class="h-85vh w-full">
    <div class="result-head" v-if="selectedMiracle">
      <h1>{{ selectedMiracle.title }}</h1>
      <p>{{ selectedMiracle.description }}</p>
    </div>
    <ms-datasource :isViewMode="true" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { h } from 'vue'
import { WarningOutlined } from '@ant-design/icons-vue'

import DataSourceTable from '@/shared/composables/table/DataSourceTable.vue'
import { IMiracle } from '@/shared/models/miracle'
import MysteriesSerivce from '@/services/mysteries'
import { MYSTERIES_ACTION } from '@/store/mysteries/actions'
import DatasourcesSerivce from '@/services/data-sources'

@Options({
  components: {
    [DataSourceTable.name]: DataSourceTable,
  },
})
export default class MysteryResult extends Vue {
  // eslint-disable-next-line
  dataSourceSerivce: any

  get isAuth() {
    return this.$store.getters.isAuth
  }

  get userInfo() {
    return this.$store.getters.userInfo
  }

  get selectedMiracle(): IMiracle {
    return this.$store.getters.miracle
  }

  doLoginAction() {
    this.$notification.open({
      duration: 3,
      message: 'Need login to use this page',
      description: '',
      icon: h(WarningOutlined, { style: 'color: red' }),
    })
    this.$router.push({ name: 'home', query: { openLoginModal: 'true' } })
  }

  listenCollectionChange(miracleId: string, userId: string) {
    this.dataSourceSerivce = new DatasourcesSerivce(this.$database, miracleId, userId)
    this.dataSourceSerivce.onListenDataSourceSingle()
  }

  async fetchData() {
    const { userId, miracleId } = this.$route.params
    if (userId !== this.userInfo.uid) {
      return this.$goto('dashboard')
    }

    await new MysteriesSerivce(this.$database, miracleId as string, userId as string)
      .loadSingleInfoMiracle()
      .then((res) => {
        if (res) {
          return this.$store.commit(MYSTERIES_ACTION.SET_ITEM, res)
        }
        this.$goto('system_error')
      })
      .finally(() => {
        this.$store.commit(MYSTERIES_ACTION.SET_ITEMS_LOADING, false)
      })

    this.listenCollectionChange(miracleId as string, userId as string)
  }

  async created() {
    this.isAuth ? await this.fetchData() : this.doLoginAction()
  }

  beforeUnmount() {
    if (this.isAuth) {
      this.dataSourceSerivce.offListenDataSource()
    }
  }
}
</script>
