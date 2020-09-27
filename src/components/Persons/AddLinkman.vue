<template>
    <div id="AddLinkman" class="addlinkman-box">
      <Header class="header" :pageTitle="pageTitle"></Header>
      <div class="person-form">
        <div class="notice">
            我们将及时通知您机票出票状态及航班相关信息
        </div>
        <div class="form-box">
          <ul class="text-box">
            <li class="text-item">
              <span>手机号：</span>
              <input type="text" placeholder="接收航班短信必填">
            </li>
            <li class="text-item">
              <span>联系人：</span>
              <input type="text" placeholder="请输入姓名">
            </li>
            <li class="text-item">
              <span>Email：</span>
              <input type="text" placeholder="请输入邮箱">
            </li>
            <li class="text-item">
              <span>设置密码：</span>
              <input type="text" placeholder="请设置密码方便登录查询订单">
            </li>
          </ul>
        </div>
        <div class="btn">确 定</div>
      </div>
      <Footer class="footer"></Footer>
    </div>
</template>

<script>
    import Header from '@/components/Header/BackFlightHeader.vue'
    import Footer from '@/components/Footer/Footer.vue'

    export default {
      name: "AddLinkman",
      data() {
        return {
          pageTitle: '填写联系人',
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
@import '@/assets/sass/set.scss';
  .addlinkman-box{
    height: 100%;
    .header{
      background-color: #f00000;
    }
    .notice{
      background: url($imguri + "notice.png") no-repeat;
      background-size: .32rem .32rem;
      background-position-x: .6rem;
      background-position-y: center;
      background-color: #ffffdb;
      height: .8rem;
      line-height: .8rem;
      padding-left: 1rem;
      color: #6e6e6e;
    }
    .form-box{
      background-color: #fff;
      padding: 0 .2rem;
      box-sizing: border-box;
      .text-box{
        font-size: .28rem;
        color: #666;
        .text-item{
          height: .8rem;
          line-height: .8rem;
          border-bottom: .02rem dotted #ccc;
          padding: 0 .3rem;
          box-sizing: border-box;
          display: flex;
          span{
            width: 1.5rem;
          }
          input{
            width: 5rem;
            box-sizing: border-box;
            border: 0;
          }
          input::placeholder{
            color: #aaa;
          }
        }
      }
    }
    .btn{
      width: 5rem;
      margin: .4rem auto;
      height: .8rem;
      line-height: .8rem;
      background-color: #f00000;
      color: #fff;
      font-size: .3rem;
      text-align: center;
      border-radius: .08rem;
      box-shadow: .04rem .02rem .04rem #999;
    }
    .btn:active{
      background-color: #B00000;
    }
    .footer{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>
