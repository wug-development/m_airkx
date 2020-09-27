<template>
  <div id="Visa" class="visa-box">
    <Header></Header>
    <div class="banner">
      <img :src='imguri + "visa/banner.png"' alt="">
    </div>
    <div class="jwk">
      <div><a href="#/visasearch"><img :src='imguri + "jiansuo.png"' alt="">检索签证</a></div>
      <div><a><img :src='imguri + "wenda.png"' alt="">签证问答</a></div>
      <div><a><img :src='imguri + "kefu.png"' alt="">联系客服</a></div>
    </div>
    <div class="qz-count">
      <hr>
      <div>1672891位用户已办理，出签率<span>99.9%</span></div>
    </div>
    <div class="recommend">
      <h4 class="title">凯行推荐</h4>
      <div class="carousel">
        <Carousel :bannerList="bannerList" :bannerHeight="bannerHeight"></Carousel>
      </div>
    </div>
    <div class="hot">
      <h4 class="title">热门签证</h4>
      <ul class="list">
        <li><a href=""><img :src='imguri + "visa/USA.png"' alt=""><div>美国<span>￥299起</span></div> </a> </li>
        <li><a href=""><img :src='imguri + "visa/Australia.png"' alt=""><div>澳大利亚<span>￥234起</span></div> </a> </li>
        <li><a href=""><img :src='imguri + "visa/NewZealand.png"' alt=""><div>新西兰<span>￥211起</span></div> </a> </li>
        <li><a href=""><img :src='imguri + "visa/Britain.png"' alt=""><div>英国<span>￥120起</span></div> </a> </li>
        <li><a href=""><img :src='imguri + "visa/Turkey.png"' alt=""><div>土耳其<span>￥445起</span></div> </a> </li>
        <li><a href=""><img :src='imguri + "visa/Brazil.png"' alt=""><div>巴西<span>￥445起</span></div> </a> </li>
        <li><a href=""><img :src='imguri + "visa/Russia.png"' alt=""><div>俄罗斯<span>￥441起</span></div> </a> </li>
        <li><a href=""><img :src='imguri + "visa/Italy.png"' alt=""><div>意大利<span>￥445起</span></div> </a> </li>
        <li><a href=""><img :src='imguri + "visa/Egypt.png"' alt=""><div>埃及<span>￥210起</span></div> </a> </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header/Header.vue'
  import Carousel from '../components/Public/Carousel.vue'
  import Footer from '../components/Footer/Footer.vue'

  export default {
    name: 'Visa',
    data() {
      return {
        bannerList: [],
        bannerHeight: '3.4rem'
      }
    },
    components: {
      Header,
      Carousel,
      Footer
    },
    created: function() {
      setTimeout(()=>{
        this.bannerList = [{
          path: this.imguri + 'visa/qz_mlxy.png',
          name: '马来西亚',
          price: '￥299'
        },{
          path: this.imguri + 'visa/qz_adly.png',
          name: '澳大利亚',
          price: '￥599'
        },{
          path: this.imguri + 'visa/qz_xjp.png',
          name: '新加坡',
          price: '￥782'
        }];
      },100)
    }
  }
</script>

<style lang="scss">
  .visa-box{
    .banner{
      width: 7.5rem;
      height: 3.22rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .jwk{
      display: flex;
      justify-content: space-around;
      font-size: .28rem;
      margin-top: .4rem;
      div{
        text-align: center;
        a{
          display: block;
          img{
            width: .54rem;
            height: .54rem;
            margin: .1rem auto;
            display: block;
          }
        }
      }
    }
    .qz-count{
      margin-top: .1rem;
      hr{
        border: .01rem solid #eee;
      }
      div{
        padding-left: .3rem;
        font-size: .28rem;
        span{
          color: #f00000;
          font-weight: bold;
        }
      }
    }
    .title{
      text-align: center;
      font-size: .3rem;
    }
    .recommend{
      margin-top: .5rem;
      width: 7.5rem;
      overflow: hidden;
      .carousel{
        margin-top: .2rem;
      }
    }
    .hot{
      margin-top: .3rem;
      border-top: .01rem solid #eee;
      padding: .5rem .3rem;
      .list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
          margin-top: .2rem;
          width: 2.18rem;
          height: 2.18rem;
          a{
            display: block;
            text-align: center;
            color: #fff;
            position: relative;
            img{
              width: 100%;
              height: 100%;
              display: block;
            }
            div{
              position: absolute;
              left: 0;
              bottom: 0.2rem;
              width: 100%;
              font-size: .28rem;
            }
            span{
              display: block;
            }
          }
        }
      }
    }
  }
</style>
