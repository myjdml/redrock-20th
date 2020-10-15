<template>
  <div id="award">
    <div class="main">
      <div>
        <div v-if="control.back" class="back" @click="Back"></div>
        <div v-if="control.cancel" class="cancel" @click="closeAward"></div>
      </div>

      <FirstPick
        v-if="control.first_pick"
        @show-worked-state="showWorkedState"
        @show-work-less-state="showWorkLessState">
      </FirstPick>
      <Worked v-if="control.worked"></Worked>
      <WorkLess v-if="control.work_less"></WorkLess>
    </div>
  </div>
</template>

<script>
import FirstPick from './award/FirstPick'
import { reactive, toRefs } from '@vue/reactivity'
import Worked from './award/Worked'
import WorkLess from './award/WorkLess'

export default {
  name: 'Award',
  components: {
    WorkLess,
    Worked,
    FirstPick
  },
  setup () {
    const state = reactive({
      control: {
        first_pick: true,
        worked: false,
        work_less: false,
        back: false,
        cancel: true
      }
    })

    // const cancelPicker = () => {
    // }
    return {
      ...toRefs(state)
    }
  },
  methods: {
    // 显示出在网校工作的表单
    showWorkedState () {
      this.control.first_pick = !this.control.first_pick
      this.control.worked = !this.control.worked
      this.control.back = !this.control.back
      // this.$emit('closeAwardState', false)
    },
    showWorkLessState () {
      this.control.first_pick = !this.control.first_pick
      this.control.work_less = !this.control.work_less
      this.control.back = !this.control.back
    },
    Back () {
      this.control.first_pick = !this.control.first_pick
      this.control.worked = false
      this.control.work_less = false
      this.control.back = !this.control.back
    },
    closeAward () {
      this.$emit('change-award-state')
    }
  }
}
</script>

<style lang="less" scoped>
  #award {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    z-index: 4;
  }
  .main {
    position: absolute;
    top: 13.5vh;
    left: 11vw;
    width: 78vw;
    height: 116vw;
    background-image: url("../assets/img/components/award/main-bac.png");
    background-size: 100%;
    .back {
      position: absolute;
      left: 60px;
      top: 60px;
      width: 30px;
      height: 30px;
      background-image: url("../assets/img/components/award/icon-back.png");
      background-size: 100%;
    }
    .cancel {
      position: absolute;
      right: 60px;
      top: 60px;
      width: 30px;
      height: 30px;
      background-image: url("../assets/img/components/award/icon-cancel.png");
      background-size: 100%;
    }
  }
</style>
