<template>
  <div id="game">
    alalal
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'

export default {
  name: 'Game',
  setup () {
    const state = reactive({

    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
 #game {

 }
</style>
