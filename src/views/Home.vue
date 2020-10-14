<template>
  <div id="home">
    <div class="start-btn" @click="Start"></div>

<!--    <Award></Award>-->
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, toRefs } from '@vue/reactivity'
// import Award from '../components/Award'
// import slideChange from '../utils/slideChange'

export default {
  name: 'Home',
  components: {
    // Award
  },
  setup () {
    const state = reactive({

    })
    return {
      ...toRefs(state)
    }
  },
  methods: {
    Start () {
      this.$router.push('/game')
      this.getGrant()
    },
    getGrant () {
      if (this.is_ios()) {
        window.DeviceOrientationEvent.requestPermission().then(state => {
          switch (state) {
            case 'granted':
              break
            case 'denied':
              alert('你拒绝了使用陀螺仪')
              break
            case 'prompt':
              alert('其他行为')
              break
          }
        })
      }
    },
    is_ios () {
      if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true
      } else {
        return false
      }
    }
  },
  },
  mounted () {
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
    cursor: pointer;
    /*img {*/
    /*  position: absolute;*/
    /*  left: 78px;*/
    /*  top: 38px;*/
    /*  width: 212px;*/
    /*}*/
  }
</style>
