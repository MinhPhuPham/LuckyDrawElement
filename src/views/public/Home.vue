<template>
  <ms-header :backIcon="false"></ms-header>
  <ms-home></ms-home>
  <ms-footer />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { collection, addDoc } from 'firebase/firestore'

import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import HomePage from '@/components/home/HomePage.vue'
import { Router } from 'vue-router'

@Options({
  components: {
    [Header.name]: Header,
    [HomePage.name]: HomePage,
    [Footer.name]: Footer,
  },
})
export default class Home extends Vue {
  beforeRouteEnter(to: Router, from: Router, next: Function) {
    console.log('run to here')

    next()
  }

  async created() {
    // try {
    //   const docRef = await addDoc(collection(this.$database, 'users'), {
    //     first: 'Ada',
    //     last: 'Lovelace',
    //     born: 1815,
    //   })
    //   console.log('Document written with ID: ', docRef.id)
    // } catch (e) {
    //   console.error('Error adding document: ', e)
    // }
  }
}
</script>
