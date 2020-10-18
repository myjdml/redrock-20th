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
      ></Award>
      <ConfirmInfo v-if="confirmInfo.state" :Info="confirmInfo.msg"></ConfirmInfo>
      <div class="back-to-2020" @click="backTo2020"></div>
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
          repeat: '请勿重复报名哦'
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
    backTo2020 () {
      this.$router.push('/home')
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
        console.log('GX' + -tofix(GX) + 'GY' + tofix(GY))
        e.x = tofix(GX)
        e.y = tofix(GY)
        console.log(1)
      }
      console.log(o.onOrient)
      o.on()
      this.orienter = o
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
      this.awardState = false
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
    World.add(engine.world, [
      // 生成边界墙壁
      Bodies.rectangle(0, 0, 750 * p, 1, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0)',
          strokeStyle: 'rgba(255, 255, 255, 0)'
        }
      }),
      Bodies.rectangle(0, 0, 1, 4470 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0)',
          strokeStyle: 'rgba(255, 255, 255, 0)'
        }
      }),
      // Bodies.rectangle(0, 2235 * p, 750 * p, 3, {
      //   isStatic: true,
      //   render: {
      //     fillStyle: 'rgba(255, 255, 255, 1)',
      //     strokeStyle: 'rgba(255, 255, 255, 1)'
      //   }
      // }),
      Bodies.rectangle(375 * p, 0, 1, 4470 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0)',
          strokeStyle: 'rgba(255, 255, 255, 0)'
        }
      }),
      // 梦开始的地方
      Bodies.rectangle(190 * p, 148 * p, 90 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(140 * p, 138 * p, 2, 40 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      // 倒烟囱组件板子
      Bodies.rectangle(210 * p, 320 * p, 330 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(70 * p, 290 * p, 110 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(122 * p, 280 * p, 2, 25 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(42 * p, 342 * p, 2, 40 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(17 * p, 322 * p, 2, 60 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      // 倒烟囱组件板子
      // 水管子组件板子
      Bodies.trapezoid(320 * p, 538 * p, 10 * p, 16 * p, 3, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.trapezoid(365 * p, 538 * p, -10 * p, 16 * p, 3, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(330 * p, 558 * p, 2, 27 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(355 * p, 570 * p, 2, 50 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(178 * p, 575 * p, 300 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(188 * p, 595 * p, 330 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      // 水管子组件板子
      Bodies.rectangle(0, 460 * p, 395 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(260 * p, 494 * p, 90 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(210 * p, 484 * p, 2, 40 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 0, 0, 1)',
          strokeStyle: 'rgba(255, 0, 0, 1)'
        }
      }),
      Bodies.rectangle(30 * p, 680 * p, 90 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      // 第二页的管子
      Bodies.trapezoid(195 * p, 738 * p, -13 * p, 40 * p, 3, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.trapezoid(128 * p, 738 * p, 13 * p, 40 * p, 3, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(145 * p, 768 * p, 10 * p, 35 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(180 * p, 782 * p, 5 * p, 60 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(160 * p, 812 * p, 40 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(18 * p, 892 * p, 50 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(103 * p, 892 * p, 60 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(45 * p, 930 * p, 2 * p, 60 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(70 * p, 905 * p, 2 * p, 20 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(65 * p, 945 * p, 45 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(95 * p, 915 * p, 45 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(110 * p, 925 * p, 2 * p, 20 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(85 * p, 955 * p, 2 * p, 20 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(215 * p, 965 * p, 260 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(245 * p, 935 * p, 260 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(345 * p, 1010 * p, 2 * p, 95 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(370 * p, 1010 * p, 2 * p, 145 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(325 * p, 1090 * p, 200 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(285 * p, 1060 * p, 120 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      // 第二页的管子
      Bodies.rectangle(165 * p, 1190 * p, 320 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(285 * p, 1295 * p, 170 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(125 * p, 1490 * p, 260 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      // 第三页的管子
      Bodies.rectangle(250 * p, 1652 * p, 250 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(120 * p, 1625 * p, 50 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(95 * p, 1655 * p, 2 * p, 50 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(125 * p, 1667 * p, 2 * p, 30 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      // 第三页的管子
      Bodies.rectangle(215 * p, 1770 * p, 2 * p, 30 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(105 * p, 1755 * p, 200 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(255 * p, 1785 * p, 90 * p, 2 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      })
    ])
    // 生成正方体
    // const stack = Composites.stack(0, 0, 1, 1, 0, 0, function () {
    //   return Bodies.rectangle(
    //     0,
    //     0,
    //     200,
    //     200,
    //     {
    //       friction: 0.1,
    //       restitution: 0.2,
    //       frictionAir: 0.15
    //       // render: {
    //       //   sprite: {
    //       //     texture: that.img.src,
    //       //   },
    //       // },
    //     }
    //   )
    // })
    const circle = Composites.stack(0, 0, 1, 1, 0, 0, function () {
      return Bodies.circle(
        375 / 2,
        100,
        8 * p,
        {
          friction: 0,
          restitution: 0.2,
          frictionAir: 0.1
          // render: {
          //   sprite: {
          //     texture: that.img.src,
          //   },
          // },
        }
      )
    })
    console.log(circle.bodies[0].position)
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
    top: 1076px;
    width: 747px;
    height: 136px;
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
    left: 53px;
    top: 1147px;
    width: 15px;
    height: 45px;
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
    top: 3244px;
    left: 185px;
    width: 114px;
    height: 119px;
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
    bottom: 130px;
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
  .back-to-2020 {
    position: absolute;
    left: 28px;
    bottom: 30px;
    width: 331px;
    height: 96px;
    background-image: url("../assets/img/game/back-to-2020.png");
    background-size: 100%;
  }
  .share {
    position: absolute;
    right: 28px;
    bottom: 30px;
    width: 269px;
    height: 96px;
    background-image: url("../assets/img/game/share.png");
    background-size: 100%;
  }
</style>
