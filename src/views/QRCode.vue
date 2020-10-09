<template>
    <div id="qr-code">
      <img src="../assets/img/qr-code/background.png" alt="background">
    </div>
</template>

<script>
export default {
  name: 'QRCode'
}
</script>

<style lang="less" scoped>
  #qr-code {
    height: 100vh;
    overflow: hidden;
    img {
      width: 100vw;
      position: absolute;
      top: 50vh;
      transform: translate(0, -747px);
    }
  }
</style>
