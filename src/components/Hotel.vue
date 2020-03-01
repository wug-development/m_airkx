<template>
  <div id="Hotel" class="hotel-box">
    <Header></Header>
    <div class="banner">
      <img src="../assets/images/hotel/hotel-banner.png" alt="">
    </div>

    <div class="hotel-tel">
      <div><img src="../assets/images/phone.png" alt=""> </div>
      <div class="phone">24小时服务联系电话：<span><a href="tel:13911139201">13911139201</a></span></div>
    </div>

    <ul class="img-list">
      <li>
        <img src="../assets/images/hotel/hotel-xinjiapo.png" alt="">
      </li>
      <li>
        <img src="../assets/images/hotel/hotel-luoshangji.png" alt="">
      </li>
      <li>
        <img src="../assets/images/hotel/hotel-dongjing.png" alt="">
      </li>
      <li>
        <img src="../assets/images/hotel/hotel-shouer.png" alt="">
      </li>
    </ul>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header/Header.vue'
  import Footer from '../components/Footer/Footer.vue'

  export default {
    name: 'Hotel',
    data() {
      return {
        bannerList: [],
        bannerHeight: '3.4rem'
      }
    },
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="scss">
  .hotel-box{
    background-color: #F4F4F4;
    .banner{
      img{
        display: block;
        width: 100%;
      }
    }
    .hotel-tel{
      display: flex;
      background-color: #fff;
      width: 6.5rem;
      margin: .3rem auto 0 auto;
      height: .95rem;
      line-height: .95rem;
      border-radius: .1rem;
      border-top-left-radius: .5rem;
      border-bottom-left-radius: .5rem;
      img{
        position: relative;
        top: -.11rem;
        left: -.11rem;
        width: 1.17rem;
        height: 1.17rem;
      }
      .phone{
        padding-left: .2rem;
        box-sizing: border-box;
        font-size: .28rem;
        span{
          color: #ffd319;
          font-size: .32rem;
        }
      }
    }
    .img-list{
      margin-top: .3rem;
      padding: 0 .2rem;
      box-sizing: border-box;
      li{
        margin-bottom: .2rem;
        img{
          display: block;
          width: 100%;
        }
      }
    }
  }
</style>
