<template>
  <div id="award">
    <div class="main">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Award'
}
</script>

<style lang="less" scoped>
  #award {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
  }
  .main {
    position: absolute;
    top: 13.5vh;
    left: 10vw;
    width: 80vw;
    height: 73vh;
    background-image: url("../assets/img/components/award/main-bac.png");
    background-size: 100%;
  }
</style>
