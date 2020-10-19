<template>
  <div id="text-show">
    <p class="ani-1">2020年-红岩网校成立</p>
    <p class="ani-2">2001年-重庆思想工作创新奖</p>
    <p class="ani-3">2006年-十佳全国高校实践网站</p>
    <p class="ani-4">2007年-十佳思政类网站</p>
    <p class="ani-5">2008年-党的理论基层先进集体</p>
    <p class="ani-6">2009年-基层理论宣讲先进集体</p>
    <p class="ani-7">2010年-重庆市五四红旗团支部</p>
    <p class="ani-8">2011年-首届重庆市IT杰出青年</p>
    <p class="ani-9">2015年-全国高校践行社会主义核心价值观，<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;示范团支部</p>
    <p class="ani-10">2016年-最佳团体组织奖<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;全国五四红旗团支部</p>
    <p class="ani-11">2018年-全国五四红旗团支部</p>
    <p class="ani-12">2019年-全国高校优秀网络栏目，重邮小帮手</p>
  </div>
</template>

<script>
export default {
  name: 'TextShow',
  props: {
    text: Array
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
  #text-show {
    width: 100vw;
    font-family: Coder,serif;
    color: #F5FDC4;
    font-size: 28px;
  }
  p {
    margin: 0 0 0 66px;
    line-height: 1.8;
  }
  @keyframes fade-in
  {
    0%{ opacity: 0;}
    100%{opacity:1;}
  }
  .ani-1 {
    opacity: 0;
    animation: fade-in 2s ease 1s 1;
    animation-fill-mode:forwards;
  }
  .ani-2 {
    opacity: 0;
    animation: fade-in 2s ease 2s 1;
    animation-fill-mode:forwards;
  }
  .ani-3 {
    opacity: 0;
    animation: fade-in 2s ease 3s 1;
    animation-fill-mode:forwards;
  }
  .ani-4 {
    opacity: 0;
    animation: fade-in 2s ease 4s 1;
    animation-fill-mode:forwards;
  }
  .ani-5 {
    opacity: 0;
    animation: fade-in 2s ease 5s 1;
    animation-fill-mode:forwards;
  }
  .ani-6 {
    opacity: 0;
    animation: fade-in 2s ease 6s 1;
    animation-fill-mode:forwards;
  }
  .ani-7 {
    opacity: 0;
    animation: fade-in 2s ease 7s 1;
    animation-fill-mode:forwards;
  }
  .ani-8 {
    opacity: 0;
    animation: fade-in 2s ease 8s 1;
    animation-fill-mode:forwards;
  }
  .ani-9 {
    opacity: 0;
    animation: fade-in 2s ease 9s 1;
    animation-fill-mode:forwards;
  }
  .ani-10 {
    opacity: 0;
    animation: fade-in 2s ease 10s 1;
    animation-fill-mode:forwards;
  }
  .ani-11 {
    opacity: 0;
    animation: fade-in 2s ease 11s 1;
    animation-fill-mode:forwards;
  }
  .ani-12 {
    opacity: 0;
    animation: fade-in 2s ease 12s 1;
    animation-fill-mode:forwards;
  }
</style>
