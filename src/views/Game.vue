<template>
  <div id="game">
    <div class="bac1"></div>
    <div class="bac2"></div>
    <div class="bac3"></div>
    <div class="bac4"></div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'

export default {
  name: 'Game',
  setup () {
    const state = reactive({

    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
  #game {
    width: 100vw;
    height: 2000px;
  }
  .bac1 {
    height: 1200px;
    background-image: url("../assets/img/game/bac1.png");
    background-size: 100%;
  }
  .bac2 {
    height: 1200px;
    background-image: url("../assets/img/game/bac2.png");
    background-size: 100%;
  }
</style>
