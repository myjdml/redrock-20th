<template>
  <div id="text">
<!--    <QuestionEditPhoto></QuestionEditPhoto>-->

    <div :class="state?'textIn':'textOut'" ref="target">阿里</div>
    <transition name="fade">
      <div v-if="state">京东</div>
    </transition>
    <button @click="Click" style="margin-top: 100px">点击</button>

  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Matter from 'matter-js'
// import QuestionEditPhoto from './game/EditImage'

export default {
  name: 'Text',
  components: {
    // QuestionEditPhoto
  },
  props: {
  },
  setup (props) {
    const state = reactive({
      controlX: {},
      orienter: {},
      state: false
    })
    return {
      ...toRefs(state)
    }
  },
  methods: {
    Click () {
      this.state = !this.state
      // this.$refs.target.className = 'textD'
      // console.log(this.$refs.target.className)
    }
  },
  /* eslint-disable  padded-blocks */
  /* eslint-disable  no-undef */
  mounted () {
    const Bodies = Matter.Bodies
    const p = 1
    const arr = [
      [190 * p, 148 * p, 90 * p, 2],
      [140 * p, 138 * p, 2, 40 * p]
    ]
    const reverse = arr.map((item) => {
      return (
        Bodies.rectangle(item[0], item[0], item[0], item[0], {
          isStatic: true,
          render: {
            fillStyle: 'rgba(255, 255, 255, 0)',
            strokeStyle: 'rgba(255, 255, 255, 0)'
          }
        })
      )
    })
    console.log(reverse)

  }
}
</script>

<style lang="less" scoped>
  #text {
    height: 100vh;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s !important;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0 !important;
  }
  @keyframes fadeIn {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .textIn {
    opacity: 0;
    animation: fadeIn 2s ease;
  }
  .textOut {
    opacity: 1;
    animation: fadeOut 2s ease;
  }
</style>
