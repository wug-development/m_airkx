<template>
  <div id="VisaSearch" class="visaSearch-box">
    <BackHeader :pageTitle="pageTitle"></BackHeader>
    <div class="search">
      <span>搜索</span>
      <input type="text" placeholder="请输入国家名称">
    </div>
    <ul class="list">
      <li class="item">
        <a href="">
          <div class="title">
            <img src="../assets/images/visa/flag-mg.png" alt="">
            <span>美国签证</span>
          </div>
          <div class="count">累计办理：23.749.59</div>
          <div class="price"><span>￥1899</span>起</div>
        </a>
      </li>
      <li class="item">
        <a href="">
          <div class="title">
            <img src="../assets/images/visa/flag-adly.png" alt="">
            <span>澳大利亚签证</span>
          </div>
          <div class="count">累计办理：11.720.22</div>
          <div class="price"><span>￥599</span>起</div>
        </a>
      </li>
      <li class="item">
        <a href="">
          <div class="title">
            <img src="../assets/images/visa/flag-xjp.png" alt="">
            <span>新加坡签证</span>
          </div>
          <div class="count">累计办理：16.231.51</div>
          <div class="price"><span>￥1899</span>起</div>
        </a>
      </li>
      <li class="item">
        <a href="">
          <div class="title">
            <img src="../assets/images/visa/flag-teq.png" alt="">
            <span>土耳其签证</span>
          </div>
          <div class="count">累计办理：1.345.45</div>
          <div class="price"><span>￥238</span>起</div>
        </a>
      </li>
      <li class="item">
        <a href="">
          <div class="title">
            <img src="../assets/images/visa/flag-xby.png" alt="">
            <span>西班牙签证</span>
          </div>
          <div class="count">累计办理：14.635.27</div>
          <div class="price"><span>￥1899</span>起</div>
        </a>
      </li>
      <li class="item">
        <a href="">
          <div class="title">
            <img src="../assets/images/visa/flag-dg.png" alt="">
            <span>德国签证</span>
          </div>
          <div class="count">累计办理：2.110.74</div>
          <div class="price"><span>￥238</span>起</div>
        </a>
      </li>
    </ul>
    <div class="vs-more">
      <div class="title">更多国家签证 <span>more<img src="../assets/images/jia-red.png" alt=""> </span> </div>
      <ul class="lab">
        <li>白俄罗斯</li>
        <li>匈牙利</li>
        <li>利比尼亚</li>
        <li>哈萨克斯坦</li>
        <li>意大利</li>
        <li>柬埔寨</li>
        <li>新西兰</li>
        <li>加拿大</li>
        <li>丹麦</li>
        <li>冰岛</li>
        <li>斯里兰卡</li>
        <li>摩洛哥</li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import BackHeader from '../components/Header/BackHeader.vue'
  import Footer from '../components/Footer/Footer.vue'

  export default {
    name: 'VisaSearch',
    data() {
      return {
        pageTitle: '办理签证的国家'
      }
    },
    components: {
      BackHeader,
      Footer
    },
    created: function() {

    }
  }
</script>

<style lang="scss">
  .visaSearch-box{
    background-color: #f4f4f4;
    .search{
      height: .9rem;
      line-height: .9rem;
      display: flex;
      padding: 0 .3rem;
      box-sizing: border-box;
      background-color: #fff;
      span{
        color: #f00000;
        font-size: .28rem;
        font-weight: bold;
        width: .9rem;
      }
      input{
        border: .02rem solid #ccc;
        border-radius: .06rem;
        width: 100%;
        height: .6rem;
        margin-top: .15rem;
        font-size: .28rem;
        text-indent: .4rem;
        outline: none;
        background: url('../assets/images/find.png') no-repeat right center;
        background-size: .5rem .5rem;
        background-position-x: 98%;
      }
    }
    .list{
      padding: .3rem .3rem 0 .3rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item{
        background-color: #fff;
        padding: .3rem 0 .3rem .16rem;
        width: 3.3rem;
        height: 2.2rem;
        box-sizing: border-box;
        margin-bottom: .3rem;
        border-radius: .08rem;
        .title{
          display: flex;
          img{
            width: 1.07rem;
            height: .56rem;
          }
          span{
            height: .56rem;
            line-height: .56rem;
            font-size: .28rem;
            font-weight: bold;
            margin-left: .16rem;
          }
        }
        .count{
          line-height: .7rem;
          height: .7rem;
          color: #777;
          font-size: .26rem;
        }
        .price{
          color: #777;
          span{
            font-size: .28rem;
            color: #333;
          }
        }
      }
    }
    .vs-more{
      padding: 0 .3rem 1.2rem .3rem;
      .title{
        font-size: .28rem;
        line-height: .32rem;
        span{
          font-size: .2rem;
          color: #f00000;
          font-weight: bold;
          padding-right: .2rem;
          img{
            width: .16rem;
          }
        }
      }
      .lab{
        margin-top: .1rem;
        display: flex;
        flex-wrap: wrap;
        li{
          background-color: #fff;
          color: #777;
          font-size: .28rem;
          padding: .14rem .2rem;
          margin: .2rem .2rem 0 0;
        }
      }
    }
  }
</style>
