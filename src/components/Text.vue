<template>
  <div id="text">
    <div class="main"></div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import Matter from 'matter-js'

export default {
  name: 'Text',
  props: {
  },
  setup (props) {
    const data = reactive({
    })
    onMounted(() => {
      const Engine = Matter.Engine
      const Render = Matter.Render
      const World = Matter.World
      const Composites = Matter.Composites
      const Bodies = Matter.Bodies

      const engine = Engine.create()
      const world = engine.world
      // 初始化引擎
      const width = 375
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
      // this.controlX = engine.world.gravity;

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
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style scoped>

</style>
