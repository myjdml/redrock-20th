<template>
    <div id="input">
      <div class="title">{{myName}}</div>
      <input type="text" :placeholder="placeholder">
    </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    myName: String,
    placeholder: String
  }
}
</script>

<style lang="less" scoped>
  #input {
    display: inline-block;
    font-family: Coder,serif;
  }
  .title {
    /*width: 63px;*/
    height: 55px;
    font-size: 30px;
    font-weight: 400;
    color: #40C2FF;
    line-height: 55px;
  }
  input {
    color: #F5FEC4;
    padding: 0;
    width: 451px;
    height: 55px;
    margin-top: 10px;
    background: #7A59E9;
    border: 1px solid #47086C;
    border-radius: 10px;
    text-align: center;
    line-height: 65px;
    outline: none;
  }
  /*修改placeholder颜色*/
  ::-webkit-input-placeholder {
    color: #AB9AED;
  }
  :-moz-placeholder {/* Firefox 18- */
    color: #AB9AED;
  }
  ::-moz-placeholder{/* Firefox 19+ */
    color: #AB9AED;
  }
  :-ms-input-placeholder {
    color: #AB9AED;
  }
</style>
