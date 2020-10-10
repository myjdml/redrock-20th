<template>
    <div id="input">
      <div class="title">报名</div>
      <input type="text" placeholder="张三"/>
    </div>
</template>

<script>
export default {
  name: 'MyInput'
}
</script>

<style lang="less" scoped>
  #input {
    display: inline-block;
    margin-top: 200px;
    font-family: Coder,serif;
  }
  .title {
    width: 63px;
    height: 55px;
    font-size: 30px;
    font-weight: 400;
    color: #40C2FF;
    line-height: 55px;
  }
  input {
    color: white;
    padding: 0;
    width: 451px;
    height: 65px;
    margin-top: 10px;
    background: #7A59E9;
    border: 1px solid #47086C;
    border-radius: 10px;
    text-align: center;
    line-height: 65px;
    outline: none;
  }
</style>
