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
             :check_msg="this.check_msg"
             @get-input-value="getPhoneNum"
    ></MyInput>

    <div class="confirm"></div>
  </div>
</template>

<script>
import MyInput from './MyInput'
export default {
  name: 'WorkLess',
  data () {
    return {
      formValue: {
        name: '',
        stu_num: '',
        phone_num: ''
      },
      check_msg: '请输入正确的电话号码'
    }
  },
  methods: {
    getName (val) {
      this.formValue.name = val
    },
    getStuNum (val) {
      this.formValue.stu_num = val
    },
    getPhoneNum (val) {
      this.formValue.phone_num = val
    }
  },
  components: {
    MyInput
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
    background-image: url("../../assets/img/components/award/confirm.png");
    background-size: 100%;
    z-index: 3;
  }
</style>
