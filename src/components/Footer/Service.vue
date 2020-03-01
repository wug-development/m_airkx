<template>
  <div id="Service" class="service-box">
    <div class="diqiu"><img src="../../assets/images/diqiu.png" alt=""></div>
    <div class="info">
      <div class="title">价格低 服务好 专注机票二十年</div>
      <ul>
        <li>一级代理商 二十年品牌</li>
        <li>先出票后付款全程短信通知</li>
        <li>安全付款支付上门刷卡</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Service',
    components: {

    }
  }
</script>

<style lang="scss">
  .service-box{
    background-color: #333;
    padding: .6rem .3rem .6rem .6rem;
    border-bottom: .01rem solid #eee;
    display: flex;
    .diqiu{
      width: 1.82rem;
      height: .95rem;
      padding-top: .5rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      color: #fff;
      padding-left: .3rem;
      .title{
        font-size: .3rem;
        line-height: .4rem;
      }
      ul{
        margin-top: .1rem;
        line-height: .5rem;
        li{
          position: relative;
          font-size: .24rem;
          padding-left: .3rem;
        }
        li::before{
          content: ' ';
          background-color: #fff;
          width: .14rem;
          height: .14rem;
          border-radius: .1rem;
          position: absolute;
          left: 0;
          top: .18rem
        }
      }
    }
  }
</style>
