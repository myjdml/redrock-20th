<template>
    <div id="input">
      <div class="title">{{myName}}</div>
      <input ref="myInput" type="text" :placeholder="placeholder" v-model="value">
    </div>
</template>

<script>
export default {
  name: 'MyInput',
  data () {
    return {
      value: ''
    }
  },
  props: {
    myName: String,
    placeholder: String,
    check_msg: String
  },
  mounted () {
    const input = this.$refs.myInput
    input.addEventListener('input', () => {
      const inputValue = this.value
      this.$emit('get-input-value', inputValue)
      console.log(this.props.check_msg)
    })
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
