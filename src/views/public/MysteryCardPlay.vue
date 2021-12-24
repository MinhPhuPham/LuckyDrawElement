<template>
  <div class="card-play__head text-center" v-if="selectedMiracle">
    <h1>{{ selectedMiracle.title }}</h1>
    <p>{{ selectedMiracle.description }}</p>
  </div>
  <div class="card-play__content">
    <ms-cards
      v-if="!isAuth || (userIdSelected && userIdSelected !== userInfo?.uid)"
      :currentResourceId="resourceIdSelected"
    ></ms-cards>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

import MysCard from '@/components/mysteries/MysCard.vue'
import MysteriesSerivce from '@/services/mysteries'
import { MYSTERIES_ACTION } from '@/store/mysteries/actions'
import { IMiracle } from '@/shared/models/miracle'

@Options({
  components: {
    [MysCard.name]: MysCard,
  },
})
export default class MysteryCardPlay extends Vue {
  resourceIdSelected = ''
  userIdSelected = ''

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

  async created() {
    const { resourceId } = this.$route.query
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

    this.userIdSelected = userId as string
    this.resourceIdSelected = resourceId as string
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

