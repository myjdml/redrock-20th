<template>
  <div :class="className">
    <div class="container" @click="playerClick" :class="clicked">
<!--      <audio ref="audio" class="audio" autoplay="autoplay" loop :src="musicUrl"></audio>-->
      <audio ref="audio" class="audio" autoplay="autoplay" loop>
        <source :src="musicUrl" type="audio/mpeg">
        Your browser does not support the audio tag.
      </audio>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-alert */
const musicUrl = 'http://cdn.redrock.team/hello-student_music1.mp3'
// const musicUrl = 'https://wsaudiobssdlbig.kugou.com/2008300845/msIXVYF_b1ichu77GdtAuA/1598834724/bss/extname/wsaudio/82459c85bd90ba1e582bbe54259611a4.mp3';
export default {
  name: 'Player',
  props: {
    className: String
  },
  data () {
    return {
      musicUrl,
      isPlaying: false
    }
  },
  computed: {
    clicked () {
      return this.isPlaying ? '' : 'paused'
    }
  },
  methods: {
    playerClick () {
      if (this.$refs.audio.paused) {
        this.isPlaying = true
        this.$refs.audio.play()
      } else {
        this.isPlaying = false
        this.$refs.audio.pause()
      }
      console.log('click it')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.playerClick()
    })
  }
}
</script>

<style lang="less" scoped>
  @keyframes Circle {
    100% {
      transform: rotate(360deg);
    }
  }
  .container {
    width: 77px;
    height: 77px;
    border-radius: 50%;
    background: url("../assets/img/icon/music.png") no-repeat;
    background-size: 100% 100%;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99;
    animation: Circle 5s infinite linear;
    animation-play-state: running;
  }
  .paused {
    animation-play-state: paused;
  }
</style>
