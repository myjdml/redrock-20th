<template>
  <div id="work-less" class="flex-cul">
    <MyInput :my-name="'姓名'" :placeholder="'张三'"></MyInput>
    <MyInput :my-name="'学号'" :placeholder="'2019***211'"></MyInput>
    <MyInput :my-name="'联系电话'" :placeholder="'182****1663'"></MyInput>

    <div class="confirm"></div>
  </div>
</template>

<script>
import MyInput from './MyInput'
export default {
  name: 'WorkLess',
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
