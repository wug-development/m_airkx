<template>
  <div id="BackFlightHeader" class="flightheader-box">
    <div class="header-back" @click="backEvent"><img :src='imguri + "back-white.png"' alt=""> </div>
    <div class="header-ptitle" v-if="pTitle" >{{pTitle}}</div>
    <a class="header-phone" href="tel:01064060909" v-if="isShow">
      <img @click="showLayer" :src='imguri + "linkphone.png"' alt="">
    </a>
  </div>
</template>

<script>
  export default {
    props: ['pageTitle', 'showTel'],
    name: 'BackFlightHeader',
    data() {
      return {
        isShow: true,
        pTitle: ''
      }
    },
    methods: {
      backEvent: function(){
        this.$router.back(-1)
      }
    },
    created: function () {
      this.pTitle = this.pageTitle
      this.isShow = this.showTel
    }

  }
</script>

<style lang="scss">
  .flightheader-box{
    width: 7.5rem;
    height: .9rem;
    display: block;
    box-sizing: border-box;
    padding: .13rem .2rem;
    color: #fff;
    background-color: transparent;
    box-shadow: none;
    text-align: center;
    .header-back{
      width: .64rem;
      height: .64rem;
      position: absolute;
      top: .13rem;
      left: .2rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .header-ptitle{
      width: 5rem;
      height: .64rem;
      margin: 0 auto;
      overflow: hidden;
      font-size: .34rem;
      line-height: .64rem;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header-phone{
      position: absolute;
      right: .2rem;
      top: .13rem;
      margin-top: .05rem;
      border: .02rem solid #fff;
      width: .54rem;
      height: .54rem;
      display: block;
      border-radius: .1rem;
      box-sizing: border-box;
      img{
        width: .44rem;
        height: .44rem;
        margin: .02rem;
      }
    }
  }
</style>
