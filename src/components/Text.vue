<template>
  <div id="text">
    <div class="main"></div>
    <div id="tip">szsss</div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
// import { onMounted } from '@vue/runtime-core'
import Matter from 'matter-js'
import Orienter from '../utils/orienter'

export default {
  name: 'Text',
  props: {
  },
  setup (props) {
    const state = reactive({
      controlX: {},
      orienter: {}
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
    // const h = window.innerHeight
    // let ratio = this.getDevicePixelRatio();
    // console.log(ratio);

    const Engine = Matter.Engine
    const Render = Matter.Render
    const World = Matter.World
    const Composites = Matter.Composites
    const Bodies = Matter.Bodies

    const engine = Engine.create()
    const world = engine.world
    // 初始化引擎
    const width = 375 * (w / 375)
    const height = 1000
    // console.log(height, width);
    const render = Render.create({
      element: document.querySelector('.main'),
      engine: engine,
      options: {
        height: height,
        width: width,
        wireframes: true,
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
      Bodies.rectangle(0, 0, 750, 1, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0)',
          strokeStyle: 'rgba(255, 255, 255, 0)'
        }
      }),
      Bodies.rectangle(0, 0, 1, 2000, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0)',
          strokeStyle: 'rgba(255, 255, 255, 0)'
        }
      }),
      Bodies.rectangle(0, 1000, 750, 1, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0)',
          strokeStyle: 'rgba(255, 255, 255, 0)'
        }
      }),
      Bodies.rectangle(375, 0, 1, 2000, {
        isStatic: true,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0)',
          strokeStyle: 'rgba(255, 255, 255, 0)'
        }
      })
    ])
    // 生成正方体
    const stack = Composites.stack(0, 0, 1, 1, 0, 0, function () {
      return Bodies.rectangle(
        0,
        0,
        200,
        200,
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
    const circle = Composites.stack(0, 0, 1, 1, 0, 0, function () {
      return Bodies.circle(
        300,
        100,
        25,
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
    World.add(world, [stack, circle])

    this.getGrant()
    // this.start(engine.world.gravity)
    this.start(engine.world.gravity)
  }
}
</script>

<style scoped>

</style>
