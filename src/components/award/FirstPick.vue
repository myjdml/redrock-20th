<template>
  <div id="first-pick" class="flex-cul">
    <div class="pick" @click="showWorked">我曾在网校工作过</div>
    <div style="height: 38px"></div>
    <div class="pick">我正在/未曾在网校工作过</div>
  </div>
</template>

<script>
export default {
  name: 'FirstPick',
  setup () {
  },
  methods: {
    showWorked () {
      this.$emit('show-worked-state')
    }
  }
}
</script>

<style lang="less" scoped>
  #first-pick {
    height: 100%;
  }
  .flex-cul {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  .pick {
    width: 451px;
    height: 110px;
    font-family: Coder,serif;
    background-color: #7A59E9;
    border: 1px solid #48086C;
    border-radius: 10px;
    color: #F5FEC4;
    text-align: center;
    line-height: 110px;
  }
</style>
