<template>
  <div id="home">
    <div class="top-img">
      <img src="../assets/img/icon/school-icon.png" alt="school-icon">
      <img src="../assets/img/icon/dang-icon.png" alt="dang-icon">
      <img src="../assets/img/icon/redrock-icon.png" alt="redrock-icon">
    </div>

    <div class="start-btn"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, toRefs } from '@vue/reactivity'

export default {
  name: 'Home',
  components: {
  },
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
  @btn-l: 50vh;
  #home{
    height: 100vh;
    background-image: url("../assets/img/home/background.png");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
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
  .start-btn {
    position: absolute;
    bottom: @btn-l;
    transform: translate(0, 370px);
    left: 199px;
    width: 366px;
    height: 133px;
    background-image: url("../assets/img/home/main-btn.png");
    background-size: 100%;
    background-repeat: no-repeat;
    /*img {*/
    /*  position: absolute;*/
    /*  left: 78px;*/
    /*  top: 38px;*/
    /*  width: 212px;*/
    /*}*/
  }
</style>
