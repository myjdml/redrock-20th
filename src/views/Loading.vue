<template>
  <div id="loading">
<!--    <img src="../assets/img/loading/icon.png" alt="icon">-->
    <div class="bar">
      <div class="main" ref="main"></div>
      <div class="cover" ref="cover"></div>
      <p>{{time.num}}%</p>
    </div>
  </div>
</template>

<script>

import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import loading from '../utils/loading'

export default {
  name: 'Loading',
  data () {
    return {
    }
  },
  props: {
  },
  setup (props, context) {
    const state = reactive({
      time: {
        num: 0
      }
    })
    onMounted(() => {
      loading(state.time)
    })
    return {
      ...toRefs(state)
    }
  },
  mounted () {
    // console.log(this.$refs.cover.style.width = '23px')
    // console.log(this.time.num)
  },
  watch: {
    time: {
      handler (val, oldVal) {
        this.$refs.cover.style.width = `${val.num / 100 * 380 / 750 * 100}vw`
        if (val.num === 100) {
          console.log('tiao')
          this.$router.push('/home')
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  #loading {
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/img/loading/background.png");
    background-position: center center;
    background-size: 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    img {
      width: 549px;
      margin-left: 125px;
      margin-top: 340px;
    }
  }
  .bar {
    position: relative;
    margin-top: 50vh;
    transform: translate(0, 40px);
    .main {
      position: absolute;
      top: 10px;
      left: 180px;
      width: 380px;
      height: 11px;
      background-color: #160FB3;
      border-radius: 5px;
    }
    .cover {
      position: absolute;
      top: 10px;
      left: 180px;
      width: 0;
      height: 11px;
      background-color: #FFFCAA;
      border-radius: 5px;
    }
    p {
      position: absolute;
      top: -57px;
      left: 580px;
      font-size: 48px;
      color: #FFFCAA;
    }
  }
</style>
