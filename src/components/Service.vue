<template>
    <div id="Service" class="servicebox">
      <Header :pageTitle="pageTitle"></Header>
      <div class="service-title">联系客服</div>
      <div class="service-bgimg">
        <img src="../assets/images/kefu-bg_02.png" alt="">
      </div>
      <ul class="service-tel-card">
        <li class="tel-book">
          <div class="icon"></div>
          <div class="tel-title">机票预定</div>
          <div class="tel-phone"><a href="tel:4007227722">400-722-7722</a></div>
          <div class="tel-phone"><a href="tel:01064060909">010-64060909</a> / <a href="tel:18601183521">18601183521</a></div>
          <div class="tel-sub">（ 24小时热线 ）</div>
        </li>
        <li class="tel-qy">
          <div class="icon"></div>
          <div class="tel-title">企业月结热线</div>
          <div class="tel-phone"><a href="tel:01084098177">010-84098177</a> / <a href="tel:18601183533">18601183533</a></div>
          <div class="tel-sub">武娟</div>
        </li>
        <li class="tel-daili">
          <div class="icon"></div>
          <div class="tel-title">同业代理</div>
          <div class="tel-phone"><a href="tel:13466638385">13466638385</a> / <a href="tel:18612568286">18612568286</a></div>
          <div class="tel-sub"><span>王卓</span><span>赵春玲</span></div>
        </li>
        <li class="tel-addr">
          <div class="icon"></div>
          <div class="tel-sub">图文传真：010-84098033</div>
          <div class="tel-sub">电子邮件：kxw@airkx.com</div>
          <div class="tel-sub">地址：北京市东城区东直门南大街9号华普花园C座9层</div>
        </li>
      </ul>      
      <div class="service-bgimg">
        <img src="../assets/images/kefu-bg_04.png" alt="">
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
  import Header from '../components/Header/BackFlightHeader.vue'
  import Footer from '../components/Footer/Footer.vue'

  export default {
    name: 'Service',
    data() {
      return {
        pageTitle: '',
        tgqLayer: false
      }
    },
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="scss">
  .servicebox{
    background: linear-gradient(#FADED7, #F8A198);
    .header-ptitle{
      color: #777;
    }
    .service-title{
      font-size: .5rem;
      color: #ed3946;
      text-align: center;
      position: relative;
      top: -.4rem;
    }
    .service-bgimg{
      width: 100%;
      margin-top: .4rem;
      img{
        width: 100%;
      }
    }
    .service-tel-card{
      margin-top: .2rem;
      padding: 0 .32rem;
      li{
        margin-top: .2rem;
        position: relative;
        background: linear-gradient(to bottom right, #F96F68, #F32928);
        padding: .5rem 0;
        text-align: center;
        border-radius: .12rem;
        color: #fff;
        line-height: .48rem;
        .icon{
          position: absolute;
          top: .32rem;
          right: .32rem;
          width: .46rem;
          height: .46rem;
          border-radius: 80px;
          border: .02rem solid #fff;
          display: flex;
          align-content: center;
          justify-content: center;
        }
        .tel-title{
          font-size: .32rem;
        }
        .tel-phone{
          font-size: .4rem;
          margin-top: .16rem;
          a{
            color: #fff;
          }
        }
        .tel-sub{
          font-size: .24rem;
          margin-top: .1rem;
          display: flex;
          justify-content: space-around;
        }
      }
      .tel-book{
        .icon{
          background: url('../assets/images/lkme-icon_03.png') no-repeat center;
          background-size: auto .2rem;
        }
      }
      .tel-qy{
        .icon{
          background: url('../assets/images/lkme-icon_07.png') no-repeat center;
          background-size: auto .21rem;
        }
      }
      .tel-daili{
        .icon{
          background: url('../assets/images/lkme-icon_11.png') no-repeat center;
          background-size: auto .25rem;
        }
      }
      .tel-addr{
        padding: .4rem 0 .4rem .4rem;
        box-sizing: border-box;
        text-align: left;
        .icon{
          background: url('../assets/images/lkme-icon_14.png') no-repeat center;
          background-size: auto .25rem;
        }
        .tel-sub{
          display: block;
        }
      }
    }
  }
</style>
