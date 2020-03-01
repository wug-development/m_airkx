<template>
  <div class="banner-box" :style="{height: bannerH}">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in bannerArr" :key="index"><img :src="item.path" @click="handleLink(item.url)" alt=""></mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>

  export default {
    props: ['bannerList', 'bannerHeight'],
    name: 'Swipe',
    data: function () {
      return {
        bannerArr: [],
        bannerH: '3.22rem'
      }
    },
    methods: {

    },
    watch: {
      bannerList (val) {
        console.log(val);
        this.bannerArr = this.bannerList
      },
      bannerHeight (val) {
        this.bannerH = this.bannerHeight
      }
    },
    created: function () {

    }
  }
</script>

<style lang="scss">
  .banner-box{
    width:7.5rem;
    position: relative;
    top:0;
    left:0;
    bottom: 0;
    right:0;
    z-index: 888;
    .line{
      width:7.5rem;
      position: absolute;
      top:0;
      left:0;
    }
    .line span{
      float:left;
      width:3.75rem;
      height:0.78rem;
    }
    .line .left-line{
      background:#3F8EFF;
    }
    .line .right-line{
      background:#3E87F0;
    }
    img{
      width:100%;
      height:100%;
    }
    .mint-swipe {
      overflow:initial;
      position: absolute;
      width:100%;
      height: 100%;
      top:0;
      left:0;
    }
    .mint-swipe-indicators {
      bottom: .16rem;
      left: 50%;
      height: 6px;
      font-size: 0rem;
    }
    .mint-swipe-indicator {
      width: 6px;
      height: 6px;
      display: inline-block;
      background: #F2F2F2;
      margin: 0 3px;
    }
    .mint-swipe-indicator.is-active {
      background: #3E87F0;
      width:6px;
    }
  }
</style>
