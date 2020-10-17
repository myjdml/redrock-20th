<template>
<!--  eslint-disable vue/no-deprecated-v-bind-sync-->
  <div id="worked" class="flex-cul">
    <MyInput :my-name="'姓名'"
             :placeholder="'张三'"
             @get-input-value="getName">
    </MyInput>
    <MyInput :my-name="'电话'"
             :placeholder="'182****1663'"
             :check_msg.sync="this.check_msg"
             @get-input-value="getPhoneNum">
    </MyInput>
    <MyInput :my-name="'届数'"
             :placeholder="'18'"
             @get-input-value="getTh">
    </MyInput>
    <MyInput :my-name="'邮寄地址'"
             :placeholder="'重邮**省**小区邮寄点'"
             @get-input-value="getAddress">
    </MyInput>
<!--    <div style="height: 10px"></div>-->
    <div class="img-input">
      <p class="img-input-title">添加图片&nbsp;&nbsp;<span>(附加证明信息)</span></p>
      <QuestionEditPhoto></QuestionEditPhoto>
    </div>

    <div class="confirm" @click="postWorked"></div>
  </div>
</template>

<script>
import MyInput from './MyInput'
import QuestionEditPhoto from '../game/EditImage'
import phoneText from '../../utils/phoneText'
export default {
  name: 'Worked',
  data () {
    return {
      formValue: {
        name: '',
        phone_num: '',
        th: '',
        address: '',
        form: ''
      },
      check_msg: '请输入正确的电话号码'
    }
  },
  components: {
    QuestionEditPhoto,
    MyInput
  },
  methods: {
    getName (val) {
      this.formValue.name = val
    },
    getPhoneNum (val) {
      this.formValue.phone_num = val
    },
    getTh (val) {
      this.formValue.th = val
    },
    getAddress (val) {
      this.formValue.address = val
    },
    postWorked () {
      const Img = this.$store.state.image
      this.formValue.form = this.handelImg(Img)
      console.log(this.formValue)
      console.log(this.formValue.form)
    },
    handelImg (Img) {
      const formData = new FormData()
      Img.forEach(blob => {
        formData.append(
          'uploadFile',
          blob,
          `${Math.random()
            .toString(36)
            .substr(2)}.jpg`
        )
      })
      return formData
    },
    handlePhoneNum () {
      if (!phoneText(this.formValue.phone_num)) {
        this.formValue.check_msg = '请输入正确的电话号码'
      } else {
        this.formValue.check_msg = ''
      }
    }
  },
  mounted () {
    console.log(this.$store.state.image)
    this.handlePhoneNum()
  }
}
</script>

<style lang="less" scoped>
  #worked {
    width: 100%;
    height: 100%;
  }
  .flex-cul {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  .confirm {
    position: absolute;
    bottom: 3px;
    width: 220px;
    height: 101px;
    background-image: url("../../assets/img/components/award/confirm.png");
    background-size: 100%;
    z-index: 3;
  }
  .img-input {
    width: 451px;
    .img-input-title {
      /*width: 290px;*/
      margin: 0;
      font-family: Coder,serif;
      height: 30px;
      font-size: 30px;
      font-weight: 400;
      color: #FE9CFF;
      line-height: 55px;
      span {
        font-size: 20px;
      }
    }
  }
</style>
