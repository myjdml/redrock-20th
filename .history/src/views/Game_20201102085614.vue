<template>
  <div id="main">
    <div id="game">
      <div class="bac1"></div>
      <div class="bac2"></div>
      <div class="bac3"></div>
      <div class="bac4"></div>
      <div class="tip"></div>

      <div>
        <div class="bac1-icon1"></div>
        <div class="bac1-icon2"></div>
        <div class="bac1-icon3"></div>
        <div class="bac1-icon1-cover"></div>
        <div class="bac1-icon2-cover"></div>
      </div>
      <div>
        <div class="bac2-icon1"></div>
        <div class="bac2-icon2"></div>
        <div class="bac2-icon3"></div>
        <div class="bac2-icon2-cover"></div>
      </div>
      <div>
        <div class="bac3-icon1"></div>
      </div>
      <TextShow class="font" v-if="fontState"></TextShow>
      <button @click="awardStart"></button>
      <Award
        v-if="awardState"
        @change-award-state="changeAwardState"
        @sign-up-success="signUpSuccess"
        @fail="fail"
        @sign-up-repeat="signUpRepeat"
      ></Award>
      <ConfirmInfo v-if="confirmInfo.state" :Info="confirmInfo.msg"></ConfirmInfo>
      <div class="back-to-2000" @click="backTo2000"></div>
      <div class="share" @click="shareImg"></div>

      <div id="cover"></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Orienter from '../utils/orienter'
import Matter from 'matter-js'
import TextShow from '../components/game/TextShow'
import Award from '../components/Award'
import ConfirmInfo from '../components/award/ConfirmInfo'
// import { getWorkLessInfo } from '../server/index'

export default {
  name: 'Game',
  components: {
    ConfirmInfo,
    Award,
    TextShow
  },
  setup () {
    const state = reactive({
      controlX: {},
      orienter: {},
      fontState: false,
      awardState: false,
      confirmInfo: {
        state: false,
        msg: '',
        info: {
          success: '参与抽奖成功',
          repeat: '请勿重复报名哦',
          fail: '请输入正确信息'
        }
      }
    })
    return {
      ...toRefs(state)
    }
  },
  methods: {
    awardStart () {
      this.awardState = true
      console.log(this.awardState)
    },
    changeAwardState () {
      this.awardState = false
    },
    backTo2000 () {
      console.log('点击时间没问题')
      location.reload()
    },
    shareImg () {
      this.$router.push('/qr-code')
    },
    start (e) {
      const o = new Orienter()
      o.onOrient = function (obj) {
        const tofix = num => (num ? Math.abs(num) / num : 0)
        const GY = Math.abs(obj.b) < 10 || Math.abs(obj.b) > 170 ? 0 : obj.b
        const GX = Math.abs(obj.g) < 10 ? 0 : obj.g
        // console.log('GX' + -tofix(GX) + 'GY' + tofix(GY) + 'obj.b' + tofix(obj.b))
        e.x = tofix(GX)
        e.y = tofix(GY) < 0 ? tofix(GY) * 0.3 : tofix(GY)
      }
      // console.log(o.onOrient)
      o.on()
      this.orienter = o
    },
    getDevicePixelRatio () {
      /* eslint-disable  camelcase */
      /* eslint-disable  prefer-const */
      /* eslint-disable  no-multi-str */
      let mediaQuery
      let is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

      if (window.devicePixelRatio !== undefined && !is_firefox) {
        return window.devicePixelRatio
      } else if (window.matchMedia) {
        mediaQuery =
          '(-webkit-min-device-pixel-ratio: 1.5),\
          (min--moz-device-pixel-ratio: 1.5),\
          (-o-min-device-pixel-ratio: 3/2),\
          (min-resolution: 1.5dppx)'
        if (window.matchMedia(mediaQuery).matches) {
          return 1.5
        }
        mediaQuery =
          '(-webkit-min-device-pixel-ratio: 2),\
          (min--moz-device-pixel-ratio: 2),\
          (-o-min-device-pixel-ratio: 2/1),\
          (min-resolution: 2dppx)'
        if (window.matchMedia(mediaQuery).matches) {
          return 2
        }
        mediaQuery =
          '(-webkit-min-device-pixel-ratio: 0.75),\
          (min--moz-device-pixel-ratio: 0.75),\
          (-o-min-device-pixel-ratio: 3/4),\
          (min-resolution: 0.75dppx)'
        if (window.matchMedia(mediaQuery).matches) {
          return 0.7
        }
      } else {
        return 1
      }
    },
    // 反馈状态
    signUpSuccess () {
      this.awardState = false
      this.confirmInfo.msg = this.confirmInfo.info.success
      this.confirmInfo.state = true
      setTimeout(() => {
        this.confirmInfo.state = false
      }, 2000)
    },
    fail () {
      this.confirmInfo.msg = this.confirmInfo.info.fail
      this.confirmInfo.state = true
      setTimeout(() => {
        this.confirmInfo.state = false
      }, 2000)
    },
    signUpRepeat () {
      this.awardState = false
      this.confirmInfo.msg = this.confirmInfo.info.repeat
      this.confirmInfo.state = true
      setTimeout(() => {
        this.confirmInfo.state = false
      }, 2000)
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
  mounted () {
    // 过渡动画
    this.$emit('change-page')
    // 上流的物理引擎
    const w = window.innerWidth
    console.log('设备宽度', w)
    // 适配的宽度参数
    const p = w / 375
    // const h = window.innerHeight
    // let ratio = this.getDevicePixelRatio();
    // console.log(ratio);

    const Engine = Matter.Engine
    const Render = Matter.Render
    const World = Matter.World
    const Composites = Matter.Composites
    const Bodies = Matter.Bodies
    console.log(Bodies)

    const engine = Engine.create()
    const world = engine.world
    // 初始化引擎
    const width = 375 * p
    const height = 2335 * p
    // console.log(height, width);
    const render = Render.create({
      element: document.querySelector('#cover'),
      engine: engine,
      options: {
        height: height,
        width: width,
        wireframes: false,
        background: 'rgba(255, 255, 255, 0)'
      }
    })
    // this.controlX = engine.world.gravity
    // engine.world.gravity.x = 1
    Engine.run(engine)
    Render.run(render)
    // 挂载引擎
    // 生成墙壁
    // 生成边界墙壁
    const boundaryArr = [
      [0, 0, 750 * p, 1],
      [0, 0, 1, 4470 * p],
      [375 * p, 0, 1, 4470 * p]
    ]
    // 梦开始的地方
    const dreamStart = [
      [190 * p, 148 * p, 90 * p, 2],
      [140 * p, 138 * p, 2, 40 * p]
    ]
    // 倒烟囱组件板子
    const invertedPipe = [
      [210 * p, 320 * p, 330 * p, 2],
      [70 * p, 290 * p, 110 * p, 2],
      [122 * p, 280 * p, 2, 25 * p],
      [42 * p, 342 * p, 2, 40 * p],
      [17 * p, 322 * p, 2, 60 * p]
    ]
    // 水管子组件板子
    const Pipe = [
      [330 * p, 558 * p, 2, 27 * p],
      [355 * p, 570 * p, 2, 50 * p],
      [178 * p, 570 * p, 300 * p, 2],
      [191 * p, 597 * p, 325 * p, 2]
    ]
    // 第二页直板子
    const secondPageHorizontalPipe = [
      [0, 460 * p, 395 * p, 2],
      [260 * p, 494 * p, 90 * p, 2],
      [210 * p, 484 * p, 2, 40 * p],
      [30 * p, 680 * p, 90 * p, 2]
    ]
    // 第二页管子
    const secondPagePipe = [
      [145 * p, 768 * p, 10 * p, 35 * p],
      [177 * p, 782 * p, 5 * p, 60 * p],
      [160 * p, 812 * p, 40 * p, 2 * p],
      [18 * p, 892 * p, 50 * p, 2 * p],
      [103 * p, 892 * p, 60 * p, 2 * p],
      [45 * p, 930 * p, 2 * p, 60 * p],
      [70 * p, 905 * p, 2 * p, 20 * p],
      [65 * p, 945 * p, 45 * p, 2 * p],
      [95 * p, 915 * p, 45 * p, 2 * p],
      [110 * p, 925 * p, 2 * p, 20 * p],
      [85 * p, 955 * p, 2 * p, 20 * p],
      [215 * p, 965 * p, 260 * p, 2 * p],
      [245 * p, 935 * p, 260 * p, 2 * p],
      [345 * p, 1010 * p, 2 * p, 95 * p],
      [370 * p, 1010 * p, 2 * p, 145 * p],
      [325 * p, 1090 * p, 200 * p, 2 * p],
      [285 * p, 1060 * p, 120 * p, 2 * p]
    ]
    // 第三页直板子
    const thirdPageHorizontalPipe = [
      [165 * p, 1190 * p, 320 * p, 2 * p],
      [285 * p, 1295 * p, 170 * p, 2 * p],
      [125 * p, 1490 * p, 260 * p, 2 * p]
    ]
    // 第三页的管子
    const thirdPagePipe = [
      [250 * p, 1652 * p, 250 * p, 2 * p],
      [120 * p, 1625 * p, 50 * p, 2 * p],
      [95 * p, 1655 * p, 2 * p, 50 * p],
      [125 * p, 1667 * p, 2 * p, 30 * p]
    ]
    // 最后的平台
    const lastHorizontalPipe = [
      [215 * p, 1770 * p, 2 * p, 30 * p],
      [105 * p, 1755 * p, 200 * p, 2 * p],
      [255 * p, 1785 * p, 90 * p, 2 * p]
    ]
    // 所有的梯形
    const trapezoid = [
      [320 * p, 538 * p, 10 * p, 16 * p, 3],
      [365 * p, 538 * p, -10 * p, 16 * p, 3],
      [195 * p, 738 * p, -13 * p, 40 * p, 3],
      [128 * p, 738 * p, 13 * p, 40 * p, 3]
    ]
    // 所有的墙
    const allArr = boundaryArr.concat(dreamStart, invertedPipe, Pipe, secondPageHorizontalPipe, secondPagePipe, thirdPageHorizontalPipe, thirdPagePipe, lastHorizontalPipe)
    const reverseArr = allArr.map((item) => {
      return (
        Bodies.rectangle(...item, {
          isStatic: true,
          render: {
            fillStyle: 'rgba(255, 255, 255, 0)',
            strokeStyle: 'rgba(255, 255, 255, 0)'
          }
        })
      )
    })
    const reverseArrTrapezoid = trapezoid.map((item) => {
      return (
        Bodies.trapezoid(...item, {
          isStatic: true,
          render: {
            fillStyle: 'rgba(255, 255, 255, 0)',
            strokeStyle: 'rgba(255, 255, 255, 0)'
          }
        })
      )
    })
    World.add(engine.world, [...reverseArr, ...reverseArrTrapezoid])

    // 生成小球
    const circle = Composites.stack(0, 0, 1, 1, 0, 0, function () {
      return Bodies.circle(
        375 * p / 2,
        100 * p,
        10 * p,
        {
          // friction: 0.04,
          restitution: 0.2,
          frictionAir: 0.15,
          render: {
            fillStyle: '#F7F787',
            strokeStyle: '#F7F787'
            // sprite: {
            //   texture: 'http://cdn.redrock.team/redrock-20th_ball_20px.png'
            // }
          }
        }
      )
    })
    // console.log(Bodies.circle)
    World.add(world, [circle])

    // this.getGrant()
    // this.start(engine.world.gravity)
    this.start(engine.world.gravity)

    // 禁止划动事件
    document.addEventListener('touchmove', (e) => {
      e.preventDefault()
    }, { passive: false })
    // document.addEventListener('scroll', () => {
    //   console.log(window.scrollX, window.scrollY)
    // })
    // 让屏幕自己滚
    const target = circle.bodies[0].position
    console.log(target)
    const main = document.querySelector('#main')
    setInterval(() => {
      if (target.y > 250) {
        main.scrollTop = target.y - 250
      }
      // console.log(main.scrollTop)
      // console.log(window.scrollY, target.y)
      if (target.y > 1880) {
        this.fontState = true
      }
    })
  }
}
</script>

<style lang="less" scoped>
  #main {
    height: 100vh;
    width: 100vw;
    overflow: scroll;
  }
  #game {
    position: relative;
    width: 100vw;
    height: 4800px;
    /*overflow: hidden;*/
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
  .bac3 {
    height: 1200px;
    background-image: url("../assets/img/game/bac3.png");
    background-size: 100%;
  }
  .bac4 {
    height: 1200px;
    background-image: url("../assets/img/game/bac4.png");
    background-size: 100%;
  }
  .tip {
    position: absolute;
    left: 248px;
    top: 318px;
    width: 292px;
    height: 75px;
    background-image: url("../assets/img/game/tip.png");
    background-size: 100%;
  }
  #cover {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .bac1-icon1 {
    position: absolute;
    top: 232px;
    width: 338px;
    height: 563px;
    background-image: url("../assets/img/game/bac1-icon1.png");
    background-size: 100%;
    z-index: 3;
  }
  .bac1-icon2 {
    position: absolute;
    left: 36px;
    top: 1084px;
    width: 703px;
    height: 128px;
    background-image: url("../assets/img/game/bac1-icon2.png");
    background-size: 100%;
    z-index: 3;
  }
  .bac1-icon3 {
    position: absolute;
    top: 1040px;
    left: 625px;
    width: 125px;
    height: 62px;
    background-image: url("../assets/img/game/bac1-icon3.png");
    background-size: 100%;
    z-index: 3;
  }
  .bac1-icon1-cover {
    position: absolute;
    left: 241px;
    top: 578px;
    width: 32px;
    height: 67px;
    background-image: url("../assets/img/game/bac1-icon1-cover.png");
    background-size: 100%;
    z-index: 3;
  }
  .bac1-icon2-cover {
    position: absolute;
    left: 55px;
    top: 1140px;
    width: 16px;
    height: 55px;
    background-image: url("../assets/img/game/bac1-icon2-cover.png");
    background-size: 100%;
    z-index: 1;
  }
  .bac2-icon1 {
    position: absolute;
    top: 1430px;
    left: 237px;
    width: 171px;
    height: 198px;
    background-image: url("../assets/img/game/bac2-icon1.png");
    background-size: 100%;
    z-index: 3;
  }
  .bac2-icon2 {
    position: absolute;
    top: 1454px;
    left: 67px;
    width: 690px;
    height: 736px;
    background-image: url("../assets/img/game/bac2-icon2.png");
    background-size: 100%;
    z-index: 3;
  }
  .bac2-icon2-cover {
    position: absolute;
    left: 439px;
    top: 2124px;
    width: 28px;
    height: 63px;
    background-image: url("../assets/img/game/bac2-icon2-cover.png");
    background-size: 100%;
    z-index: 1;
  }
  .bac3-icon1 {
    position: absolute;
    top: 3250px;
    left: 188px;
    width: 266px;
    height: 118px;
    background-image: url("../assets/img/game/bac3-icon1.png");
    background-size: 100%;
    z-index: 3;
  }
  .font {
    position: absolute;
    top: 3700px;
  }
  button {
    position: absolute;
    bottom: 155px;
    left: 190px;
    z-index: 3;
    width: 373px;
    height: 136px;
    background-image: url("../assets/img/game/button.png");
    background-color: rgba(0, 0, 0, 0);
    background-size: 100%;
    outline: none;
    border: none;
  }
  .back-to-2000 {
    position: absolute;
    left: 28px;
    bottom: 30px;
    width: 331px;
    height: 96px;
    background-image: url("../assets/img/game/back-to-2000.png");
    background-size: 100%;
    z-index: 5;
  }
  .share {
    position: absolute;
    right: 28px;
    bottom: 30px;
    width: 269px;
    height: 96px;
    background-image: url("../assets/img/game/share.png");
    background-size: 100%;
    z-index: 5;
  }
</style>
