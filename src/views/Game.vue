<template>
  <div id="game">
    <div class="bac1"></div>
    <div class="bac2"></div>
    <div class="bac3"></div>
    <div class="bac4"></div>
  </div>

  <div>
    <div class="bac1-icon1"></div>
    <div class="bac1-icon2"></div>
    <div class="bac1-icon3"></div>
  </div>

  <div id="cover"></div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Orienter from '../utils/orienter'
import Matter from 'matter-js'

export default {
  name: 'Game',
  setup () {
    const state = reactive({

    })
    return {
      ...toRefs(state)
    }
  },
  methods: {
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
    const w = window.innerWidth
    // 适配的宽度参数
    const p = w / 350
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
    const height = 1000
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
      Bodies.rectangle(0, 0, 1, 2000 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0)',
          strokeStyle: 'rgba(255, 255, 255, 0)'
        }
      }),
      Bodies.rectangle(0, 1000, 750 * p, 1, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0)',
          strokeStyle: 'rgba(255, 255, 255, 0)'
        }
      }),
      Bodies.rectangle(375 * p, 0, 1, 2000 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0)',
          strokeStyle: 'rgba(255, 255, 255, 0)'
        }
      }),
      // 梦开始的地方
      Bodies.rectangle(180 * p, 138 * p, 90 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(130 * p, 128 * p, 2, 40 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      // 倒烟囱组件板子
      Bodies.rectangle(200 * p, 300 * p, 320 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(70 * p, 270 * p, 110 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(112 * p, 260 * p, 2, 25 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(42 * p, 322 * p, 2, 40 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(17 * p, 302 * p, 2, 60 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      // 倒烟囱组件板子
      // 水管子组件板子
      Bodies.trapezoid(300 * p, 505 * p, 10 * p, 16 * p, 3, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.trapezoid(340 * p, 505 * p, -10 * p, 16 * p, 3, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(306 * p, 525 * p, 2, 27 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(332 * p, 535 * p, 2, 50 * p, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(165 * p, 535 * p, 280 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(178 * p, 560 * p, 305 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      // 水管子组件板子
      Bodies.rectangle(0, 430 * p, 395 * p, 2, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 1)',
          strokeStyle: 'rgba(255, 255, 255, 1)'
        }
      }),
      Bodies.rectangle(240 * p, 464 * p, 90 * p, 2, {
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
        15,
        {
          friction: 0.1,
          restitution: 0.2,
          frictionAir: 0.15
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
  #cover {
    position: absolute;
    top: 0;
    left: 0;
  }
  .bac1-icon1 {
    position: absolute;
    top: 232px;
    width: 338px;
    height: 563px;
    background-image: url("../assets/img/game/bac1-icon1.png");
    background-size: 100%;
  }
  .bac1-icon2 {
    position: absolute;
    top: 1076px;
    width: 747px;
    height: 136px;
    background-image: url("../assets/img/game/bac1-icon2.png");
    background-size: 100%;
  }
  .bac1-icon3 {
    position: absolute;
    top: 1040px;
    left: 625px;
    width: 125px;
    height: 62px;
    background-image: url("../assets/img/game/bac1-icon3.png");
    background-size: 100%;
  }
</style>
