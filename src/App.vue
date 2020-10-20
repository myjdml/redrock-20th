<template>
  <div id="app">
    <div class="top-img">
      <img src="./assets/img/icon/school-icon.png" alt="school-icon">
      <img src="./assets/img/icon/dang-icon.png" alt="dang-icon">
      <img src="./assets/img/icon/redrock-icon.png" alt="redrock-icon">
    </div>

    <router-view v-slot="{ Component }">
      <transition ref="target">
        <keep-alive :exclude="['Game']">
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
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
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
    transition: all 5s linear;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .fade-leave, .fade-enter-to {
    opacity: 1;
  }
  .text {
  }
</style>
