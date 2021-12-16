<template>
  <q-layout view="lHh Lpr lFf">
    <q-header flat>
      <q-toolbar>
        

        <q-toolbar-title>
          Welcome to Movie Info By Himanshu Manchanda
        </q-toolbar-title>

      </q-toolbar>
    </q-header>


    <q-page-container>
      <MovieInfo />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import MovieInfo from './components/MovieInfo.vue'

export default {
  name: 'LayoutDefault',

  components: {
    MovieInfo
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
