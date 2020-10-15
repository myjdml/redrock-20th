<template>
  <div id="app">
    <div class="top-img">
      <img src="./assets/img/icon/school-icon.png" alt="school-icon">
      <img src="./assets/img/icon/dang-icon.png" alt="dang-icon">
      <img src="./assets/img/icon/redrock-icon.png" alt="redrock-icon">
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

    <Player></Player>
  </div>
</template>

<script>
import Player from './components/Player.vue'
export default {
  name: 'App',
  components: {
    Player
  },
  data () {
    return {
      pageChange: 'next'
    }
  },
  methods: {
    handleCheckoutPage () {
      this.pageChange = 'next'

      setTimeout(() => {
        this.pageChange = 'prev'
      }, 400)
    }
  }
}
</script>

<style lang="less" scoped>
  #app {
    /*font-family: Coder,serif;*/
  }
  .top-img {
    img {
      position: absolute;
      top: 34px;
      width: 52px;
      z-index: 3;
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
  .prev-enter,
  .next-leave-to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  .prev-leave-to,
  .next-enter {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  .next-enter-to,
  .next-leave,
  .prev-enter-to,
  .prev-leave {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .next-enter-active,
  .next-leave-active,
  .prev-enter-active,
  .prev-leave-active {
    transition: all 1s;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .fade-leave, .fade-enter-to {
    opacity: 1;
  }
</style>
