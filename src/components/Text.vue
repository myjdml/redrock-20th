<template>
  <div id="text">
<!--    <QuestionEditPhoto></QuestionEditPhoto>-->
    <transition name="fade">
      <div v-if="state">阿里</div>
    </transition>
    <button @click="state = !state" style="margin-top: 100px">点击</button>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
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
  }
}
</script>

<style lang="less" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
