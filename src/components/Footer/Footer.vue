<template>
  <div id="Footer" class="footer-box">
    <div class="link">
      <a href="#/">首页</a>
      <a href="https://www16.53kf.com/m.php?cid=72173611&arg=10173611&kf_sign=zQxMTMTUyMAyMjEwMTg1MDc0NDA4MDA0&style=1">在线咨询</a>
      <a href="#/service">联系客服</a>
      <a href="#/about">关于凯行</a>
      <a href="#/complaint">投诉建议</a>
    </div>
    <div class="icp">
      京ICP证060116号
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    components: {

    }
  }
</script>

<style lang="scss">
  .footer-box{
    background-color: #333;
    color: #fff;
    text-align: center;
    font-size: .28rem;
    height: 2.4rem;
    .link{
      padding: .4rem 0;
      display: flex;
      justify-content: center;
      a{
        color: #fff;
        border-right: 1px solid #fff;
        padding: 0 .12rem;
        margin: 0;
      }
      a:first-child{
        border-left: 1px solid #fff;
      }
    }
    .icp{
      padding-bottom: .8rem;
    }
  }
</style>
