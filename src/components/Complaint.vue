<template>
    <div id="Complaint" class="complaint-box">
      <div class="cp-head"><Header></Header></div>
      <div class="complaint-body">
        <div class="banner">
          <img src="../assets/images/complaint.png" alt="">
        </div>
        <div class="info">
          <div class="jianyi">您对凯行网有任何不满意或好的建议请直言；我们会尽快对您的投诉及建议做出回复。我们欢迎每一位用户对凯行网的服务做出评价，提出建议！</div>
          <div class="tousu">
            <div>投诉电话：18601183538</div>
            <div>投诉邮箱：sale@airkx.com</div>
            <div>投诉时间：9：30--17：30</div>
          </div>
          <div class="zf">
            有了您的监督和支持，我们将做的更好。
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
    import Header from '../components/Header/BackFlightHeader.vue'
    import Footer from '../components/Footer/Footer.vue'
    export default {
      name: "Complaint",
      data() {
        return {
          pageTitle: '',
          showTel: false,
        }
      },
      components: {
        Header,
        Footer
      },
    }
</script>

<style lang="scss">
  .complaint-box{
    position: relative;
    height: 100%;
    background-color: #fff;
    .cp-head{
      position: absolute;
      left: 0;
      top:0;
      width: 100%;
    }
    .complaint-body{
      margin: 0;
      padding-bottom:1rem;
      .banner{
        width: 100%;
        padding: 0;
        img{
          display: block;
          width: 100%;
        }
      }
      .info{
        padding: .3rem;
        box-sizing: border-box;
        font-size: .28rem;
        font-family: "黑体", sans-serif;
        .jianyi{
          line-height: .4rem;
        }
        .tousu{
          margin-top: .4rem;
          line-height: 1rem;
        }
        .zf{
          margin-top: .5rem;
          font-size: .3rem;
          color: #f00000;
        }
      }
    }
  }
</style>
