<template>
  <div class="card-play__head text-center" v-if="selectedMiracle">
    <h1>{{ selectedMiracle.title }}</h1>
    <p>{{ selectedMiracle.description }}</p>
  </div>
  <div class="card-play__content">
    <ms-cards v-if="!isOwnerMiracle" :currentResourceId="resourceSelected.id"></ms-cards>
    <ms-datasource :isViewMode="true" v-if="selectedMiracle && isOwnerMiracle" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

import MysCard from '@/components/mysteries/MysCard.vue'
import DataSourceTable from '@/shared/composables/table/DataSourceTable.vue'
import { Prop } from 'vue-property-decorator'
import { ICardDataSource } from '@/shared/models/datasources'
import MysteriesSerivce from '@/services/mysteries'
import { MYSTERIES_ACTION } from '@/store/mysteries/actions'
import { IMiracle } from '@/shared/models/miracle'
import DatasourcesSerivce from '@/services/data-sources'
import { errorNotification } from '@/helpers/notification'

@Options({
  components: {
    [MysCard.name]: MysCard,
    [DataSourceTable.name]: DataSourceTable,
  },
  name: 'ms-card-screen',
})
export default class MysterCardPlayScreen extends Vue {
  @Prop() resourceSelected!: ICardDataSource

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

  get isOwnerMiracle() {
    return this.isAuth && this.selectedMiracle.creatorId === this.userInfo.uid
  }

  listenCollectionChange(miracleId: string, userId: string) {
    this.dataSourceSerivce = new DatasourcesSerivce(this.$database, miracleId, userId)
    this.dataSourceSerivce.onListenDataSourceSingle()
  }

  async created() {
    const { userId, miracleId } = this.$route.params
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

    if (this.isOwnerMiracle) {
      this.listenCollectionChange(miracleId as string, userId as string)
    } else if (this.resourceSelected.isPlayed && this.isAuth) {
      sessionStorage.setItem(`${miracleId}`, JSON.stringify(this.resourceSelected))
      this.$goto('played_link')
    }
  }

  beforeUnmount() {
    if (this.isOwnerMiracle) {
      this.dataSourceSerivce.offListenDataSource()
    }
  }
}
</script>

<style lang="scss" scoped>
.card-play {
  &__head {
    h1 {
      margin-top: 1.5rem;
    }

    p {
      color: rgba(107, 114, 128);
      font-size: 1rem;
      line-height: 1.5;
    }
  }

  &__content {
    width: 90%;
    max-width: 1600px;
    margin: 0 auto;
  }
}
</style>
