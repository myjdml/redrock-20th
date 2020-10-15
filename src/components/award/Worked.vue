<template>
  <div id="worked" class="flex-cul">
    <MyInput :my-name="'姓名'" :placeholder="'张三'"></MyInput>
    <MyInput :my-name="'电话'" :placeholder="'182****1663'"></MyInput>
    <MyInput :my-name="'届数'" :placeholder="'18'"></MyInput>
    <MyInput :my-name="'邮寄地址'" :placeholder="'重邮**省**小区邮寄点'"></MyInput>
<!--    <div style="height: 10px"></div>-->
    <div class="img-input">
      <p class="img-input-title">添加图片&nbsp;&nbsp;<span>(附加证明信息)</span></p>
      <QuestionEditPhoto></QuestionEditPhoto>
    </div>

    <div class="confirm"></div>
  </div>
</template>

<script>
import MyInput from './MyInput'
import QuestionEditPhoto from '../game/EditImage'
export default {
  name: 'Worked',
  components: {
    QuestionEditPhoto,
    MyInput
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
