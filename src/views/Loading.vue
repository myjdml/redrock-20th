<template>
  <div id="loading">
    <div class="main">
      <p>{{time.num}}</p>
    </div>
  </div>
</template>

<script>

import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import loading from '../utils/loading'

export default {
  name: 'Loading',
  props: {
  },
  setup (props) {
    const state = reactive({
      time: {
        num: 0
      }
    })
    onMounted(() => {
      loading(state.time)
    })
    return {
      ...toRefs(state)
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
    /*border: black solid 1px;*/
  }
</style>
