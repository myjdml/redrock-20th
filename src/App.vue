<template>
  <div id="app">
    <div class="top-img">
      <img src="./assets/img/icon/school-icon.png" alt="school-icon">
      <img src="./assets/img/icon/dang-icon.png" alt="dang-icon">
      <img src="./assets/img/icon/redrock-icon.png" alt="redrock-icon">
    </div>
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
  .top-img {
    img {
      position: absolute;
      top: 34px;
      width: 52px;
    }
    img:nth-child(1) {
      left: 37px;
    }
    img:nth-child(2) {
      left: 111px;
    }
    img:nth-child(3) {
      left: 183px;
    }
  }
</style>
