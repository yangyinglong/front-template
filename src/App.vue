<template>
  <div id="app">
    <Headers />
    <router-view/>
    <Footers />
  </div>
</template>

<script>
import Headers from "./components/Header"
import Footers from "./components/Footer"

export default {
  name: 'App',
  components:{
    Headers,
    Footers
  }
}
</script>

<style>
#app {
  /*background: #C9C9C9*/
}
</style>
