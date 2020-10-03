<template>
  <div id="loading">
    <div class="main">
    </div>
  </div>
</template>

<script>

import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import Matter from 'matter-js'

export default {
  name: 'Loading',
  props: {
  },
  setup (props) {
    const data = reactive({
      msg: 'alalal',
      arr: [
        {
          value: 'zhangsdan',
          index: 1
        },
        {
          value: 'lisi',
          index: 2
        },
        {
          value: 'wangwu',
          index: 3
        }
      ]
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
      const width = 4000
      const height = 4000
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
        Bodies.rectangle(0, 0, 1600, 1, {
          isStatic: true,
          render: {
            fillStyle: 'rgba(255, 255, 255, 0)',
            strokeStyle: 'rgba(255, 255, 255, 0)'
          }
        }),
        Bodies.rectangle(0, 0, 1, 1600, {
          isStatic: true,
          render: {
            fillStyle: 'rgba(255, 255, 255, 0)',
            strokeStyle: 'rgba(255, 255, 255, 0)'
          }
        }),
        Bodies.rectangle(0, 800, 1600, 1, {
          isStatic: true,
          render: {
            fillStyle: 'rgba(255, 255, 255, 0)',
            strokeStyle: 'rgba(255, 255, 255, 0)'
          }
        }),
        Bodies.rectangle(800, 0, 1, 1600, {
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
          400,
          400,
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
      World.add(world, [stack])
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
  #loading {
  }
  .main {
    width: 500px;
    height: 300px;
    border: black solid 1px;
  }
</style>
