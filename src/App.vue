<template>
  <div id="app">
    <router-view/>
    <Player></Player>
  </div>
</template>

<script>
import Player from './components/Player.vue'
export default {
  name: 'App',
  components: {
    Player
  }
}
</script>

<style lang="less" scoped>
  #app {
    font-family: Coder,serif;
  }
</style>
