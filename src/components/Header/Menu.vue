<template>
  <div class="menu-box" v-if="isShow" @click="closeLayer">
    <div class="box">
      <div class="sanjiao"></div>
      <ul class="list">
        <li class="item jp"><a href="#/">国际机票</a></li>
        <li class="item qz"><a href="#/visa">签证办理</a></li>
        <li class="item bx"><a href="#/safe">境外保险</a></li>
        <li class="item jd"><a href="#/hotel">境外酒店</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['showMenu'],
    name: 'BackHeader',
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      closeLayer: function (){
        this.$emit('closelayer',false);
      }
    },
    watch: {
      showMenu (val) {
        this.isShow = val
      }
    }
  }
</script>

<style lang="scss">
  .menu-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(0,0,0,.6);
    .box{
      position: absolute;
      top: 1rem;
      right: .2rem;
      width: 2.7rem;
      height: 3.6rem;
      background-color: #fff;
      color: #333;
      .sanjiao{
        margin-top: -.2rem;
        width: 0;
        float: right;
        margin-right: .1rem;
        border-width: 0 .2rem .2rem;
        border-color: transparent transparent #fff;
        border-style: solid;
      }
      .list{
        padding: .1rem .4rem;
        box-sizing: border-box;
        .item{
          border-top: .02rem dashed #999;
          height: .82rem;
          line-height: .82rem;
          padding-left: .6rem;
          font-size: .28rem;
        }
        .jp{
          background: url('../../assets/images/jipiao.png') no-repeat left center;
          background-size: .37rem .26rem;
        }
        .qz{
          background: url('../../assets/images/qianzheng.png') no-repeat left center;
          background-size: .28rem .33rem;
          background-position: .06rem;
        }
        .bx{
          background: url('../../assets/images/baoxian.png') no-repeat left center;
          background-size: .27rem .31rem;
          background-position: .06rem;
        }
        .jd{
          background: url('../../assets/images/jiudian.png') no-repeat left center;
          background-size: .29rem .31rem;
          background-position: .06rem;
        }
        .item:first-child{
          border: 0;
        }
      }
    }
  }
</style>
