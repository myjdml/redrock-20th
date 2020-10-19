<template>
<!--  eslint-disable vue/no-deprecated-v-bind-sync-->
  <div id="worked" class="flex-cul">
    <MyInput :my-name="'姓名'"
             :placeholder="'张三'"
             @get-input-value="getName"
    ></MyInput>
    <MyInput :my-name="'电话'"
             :placeholder="'182****1663'"
             :check_msg="'(请输入正确电话)'"
             @get-input-value="getPhoneNum"
    ></MyInput>
    <MyInput :my-name="'届数'"
             :placeholder="'18'"
             @get-input-value="gradeAndPosition"
    ></MyInput>
    <MyInput :my-name="'邮寄地址'"
             :placeholder="'重邮**省**小区邮寄点'"
             @get-input-value="getAddress"
    ></MyInput>
<!--    <div style="height: 10px"></div>-->
    <div class="img-input">
      <p class="img-input-title">添加图片&nbsp;&nbsp;<span>(附加证明信息)</span></p>
      <QuestionEditPhoto></QuestionEditPhoto>
    </div>

    <div class="confirm" ref="confirm" @click="postWorked"></div>
  </div>
</template>

<script>
import MyInput from './MyInput'
import QuestionEditPhoto from '../game/EditImage'
import { postWorkedInfo } from '../../server/index'

export default {
  name: 'Worked',
  data () {
    return {
      formValue: {
        name: '',
        phone: '',
        gradeAndPosition: '',
        address: '',
        file: ''
      },
      formData: ''
    }
  },
  components: {
    QuestionEditPhoto,
    MyInput
  },
  watch: {
    formValue: {
      handler (val, oldVal) {
        if (val.name !== '' && val.gradeAndPosition !== '' && val.phone !== '' && val.address !== '') {
          this.$refs.confirm.className = 'confirm_img'
        }
      },
      deep: true
    }
  },
  methods: {
    getName (val) {
      this.formValue.name = val
    },
    getPhoneNum (val) {
      this.formValue.phone = val
    },
    gradeAndPosition (val) {
      this.formValue.gradeAndPosition = val
    },
    getAddress (val) {
      this.formValue.address = val
    },
    postWorked () {
      const Img = this.$store.state.image
      this.formData = this.handelImg(Img)
      this.formData.append('name', this.formValue.name)
      this.formData.append('phone', this.formValue.phone)
      this.formData.append('gradeAndPosition', this.formValue.gradeAndPosition)
      this.formData.append('address', this.formValue.address)
      // console.log(this.formValue)
      // console.log(this.$store.state.image[0])
      postWorkedInfo('/redrocker/create', this.formData).then((response) => {
        console.log('回复', response)
        if (response.data.code === 10000) {
          this.$emit('sign-up-success')
        } if (typeof response.data.error === 'string') {
          this.$emit('sign-up-repeat')
        } else {
          this.$emit('fail')
        }
      })
    },
    handelImg (Img) {
      const formData = new FormData()
      Img.forEach(blob => {
        formData.append(
          'file',
          blob,
          `${Math.random()
            .toString(36)
            .substr(2)}.jpg`
        )
      })
      return formData
    }
  },
  mounted () {
    console.log(this.$store.state.image)
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
    background-image: url("../../assets/img/components/award/confirm_unready.png");
    background-size: 100%;
    z-index: 3;
  }
  .confirm_img {
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
