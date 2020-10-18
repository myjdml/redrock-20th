<template>
  <div id="work-less" class="flex-cul">
    <MyInput :my-name="'姓名'"
             :placeholder="'张三'"
             @get-input-value="getName"
    ></MyInput>
    <MyInput :my-name="'学号'"
             :placeholder="'2019***211'"
             @get-input-value="getStuNum"
    ></MyInput>
    <MyInput :my-name="'电话'"
             :placeholder="'182****1663'"
             :check_msg="'(请输入正确电话)'"
             @get-input-value="getPhoneNum"
    ></MyInput>

    <div class="confirm" ref="confirm" @click="postWorkLess"></div>
  </div>
</template>

<script>
import MyInput from './MyInput'
import { postWorkLessInfo } from '../../server'

export default {
  name: 'WorkLess',
  data () {
    return {
      formValue: {
        name: '',
        sno: '',
        phone: ''
      }
    }
  },
  mounted () {
    console.log(this.$refs)
  },
  methods: {
    getName (val) {
      this.formValue.name = val
    },
    getStuNum (val) {
      this.formValue.sno = val
    },
    getPhoneNum (val) {
      this.formValue.phone = val
    },
    postWorkLess () {
      console.log(this.formValue)
      postWorkLessInfo('/student/create', this.formValue).then((response) => {
        console.log('回复', response)
        if (response.code === 10000) {
          this.$emit('sign-up-success')
        } else {
          this.$emit('fail')
        }
      })
      console.log(this.$refs.confirm.style.backgroundImage = 'url("../../assets/img/components/award/confirm.png")')
    }
  },
  components: {
    MyInput
  },
  watch: {
    formValue: {
      handler (val, oldVal) {
        if (val.name !== '' && val.sno !== '' && val.phone !== '') {
          console.log(this.$refs.confirm.className)
          this.$refs.confirm.className = 'confirm_img'
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  #work-less {
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
    bottom: 63px;
    width: 220px;
    height: 101px;
    background-image: url("../../assets/img/components/award/confirm_unready.png");
    background-size: 100%;
    z-index: 3;
  }
  .confirm_img {
    position: absolute;
    bottom: 63px;
    width: 220px;
    height: 101px;
    background-image: url("../../assets/img/components/award/confirm.png");
    background-size: 100%;
    z-index: 3;;
  }
</style>
