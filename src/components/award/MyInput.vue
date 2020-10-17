<template>
    <div id="input">
      <div class="title">{{myName}}</div>
      <div class="alert_msg">{{alert_msg}}</div>
      <input ref="myInput" type="text" :placeholder="placeholder" v-model="value">
    </div>
</template>

<script>
import phoneText from '../../utils/phoneText'

export default {
  name: 'MyInput',
  data () {
    return {
      value: '',
      alert_msg: ''
    }
  },
  props: {
    myName: String,
    placeholder: String,
    check_msg: String
  },
  methods: {
    handlePhoneNum (phoneNum) {
      if (this.$props.check_msg && !phoneText(phoneNum)) {
        this.alert_msg = '(请输入正确电话)'
      } else {
        this.alert_msg = ''
      }
    }
  },
  mounted () {
    const input = this.$refs.myInput
    input.addEventListener('input', () => {
      const inputValue = this.value
      this.$emit('get-input-value', inputValue)
      // console.log(this.$props.check_msg)
      if (this.$props.check_msg) {
        this.alert_msg = this.$props.check_msg
      }
      // console.log(this.alert_msg)
      // 验证电话号码是否正确
      this.handlePhoneNum(this.value)
    })
  }
}
</script>

<style lang="less" scoped>
  #input {
    position: relative;
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
  .alert_msg {
    position: absolute;
    top: 6px;
    left: 80px;
    width: 165px;
    height: 20px;
    font-size: 20px;
    font-weight: 400;
    color: #FF4040;
    line-height: 55px;
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
