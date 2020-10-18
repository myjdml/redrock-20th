<template>
  <div id="confirm-info" class="flex-cul">
    <div class="alert">{{Info}}</div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmInfo',
  props: {
    Info: String
  }
}
</script>

<style lang="less" scoped>
  #confirm-info {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .34);
    z-index: 3;
  }
  .flex-cul {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  .alert {
    width: 431px;
    height: 146px;
    background-image: url("../../assets/img/components/game/confirm-info/bac.png");
    background-size: 100%;
    color: #F5FDC4;
    font-family: Coder,serif;
    font-size: 36px;
    line-height: 146px;
    text-align: center;
  }
</style>
