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
              <input type="tel" @blur="checkTel" v-model="tel" placeholder="接收航班短信必填" maxlength="11">
            </li>
            <li class="text-item" v-if="!isVip">
              <span>联系人：</span>
              <input type="text" v-model="linkname" placeholder="请输入姓名" maxlength="20">
            </li>
            <li class="text-item" v-if="!isVip">
              <span>Email：</span>
              <input type="email" v-model="email" placeholder="请输入邮箱" maxlength="50">
            </li>
            <li class="text-item">
              <span>{{passkey}}：</span>
              <input type="text" v-model="pass" :placeholder="passName" maxlength="20">
            </li>
            <li class="text-items" v-if="isVip">
              <label @click="forgetPassword">忘记密码？</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="amount">
        <span>￥{{amountPrice}}</span>
        <a @click="checkForm">下一步</a>
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
          tgqLayer: false,
          amountPrice: 0,
          userID: 0,
          tel: '',
          linkname: '',
          email: '',
          isVip: false,
          pass: '',
          passkey: '设置密码',
          passName: '请设置您的订单查询密码'
        }
      },
      components: {
        Header,
        Footer
      },
      methods: {
        checkTel: function () {
          this.passName = '请设置您的订单查询密码'
          this.passkey = '设置密码'
          if(this.tel === ''){
            this.utils.alert(this, '请输入您的手机号码')
          }else if(!this.utils.checkTel(this.tel)){
            this.utils.alert(this, '请输入正确的手机号码')
          }else {
            let param = new URLSearchParams()
            param.append("Mobile", this.tel)
            this.utils.ajax({
              method: 'post',
              name: this,
              uri: 'FindLoginServlet',
              params: param,
              success: res=>{
                if(res.status === 200 && res.data == 1){
                  this.isVip = true
                  this.passName = '系统检测您已是注册会员'
                  this.passkey = '登录密码'
                }else{
                  this.isVip = false
                }
              },fail: ()=>{
                this.utils.alert(this, '网络连接失败')
              }
            })
          }
        },
        checkForm: function () {
          if(this.tel === ''){
            this.utils.alert(this, '请输入您的手机号码')
          }else if(!this.utils.checkTel(this.tel)){
            this.utils.alert(this, '请输入正确的手机号码')
          }else if(!this.isVip && this.linkname === ''){
            this.utils.alert(this, '请输入您的姓名')
          }else if(!this.isVip && this.email === ''){
            this.utils.alert(this, '请输入您的邮箱')
          }else if(!this.isVip && !this.utils.checkEmail(this.email)){
            this.utils.alert(this, '请输入正确的邮箱')
          }else if(this.pass === ''){
            if(this.isVip){
              this.utils.alert(this, '请输入登录密码')
            }else{
              this.utils.alert(this, '请设置订单查询密码')
            }
          }else if(this.isVip){
            this.Indicator.open()
            this.utils.ajax({
              name: this,
              uri:  'IsLogin',
              params: { params: { phone: this.tel, pass: this.pass } },
              success: res=>{
                this.Indicator.close()
                if(res.status === 200 && res.data > 0){
                  this.utils.setItem('kxUserID',res.data+"")
                  this.utils.setItem('lmtel', this.tel)
                  this.utils.setItem('lmpass', this.pass)
                  this.utils.setItem('lmvip', this.isVip)
                  if(!this.isVIP){
                    this.utils.setItem('lmemail', this.email)
                    this.utils.setItem('lmname', this.linkname)
                  }
                  this.$router.push({ path: '/addperson' })
                }else {
                  this.utils.alert(this, '密码错误！', '温馨提示')
                }
              },
              fail: ()=> {
                this.Indicator.close()
                this.utils.alert(this, '网络连接失败，请刷新重试')
              }
            })
          }else{
            this.Indicator.open()
            this.utils.setItem('lmtel', this.tel)
            this.utils.setItem('lmpass', this.pass)
            this.utils.setItem('lmvip', true)
            this.utils.setItem('lmemail', this.email)
            this.utils.setItem('lmname', this.linkname)
            let param = new URLSearchParams()
            param.append("Mobile", this.tel)
            param.append("password", this.pass)
            param.append("emall", this.email)
            param.append("contact", this.linkname)
            this.utils.ajax({
              name: this,
              uri: 'RegisterServlet',
              method: 'post',
              params: param,
              success: res => {
                this.Indicator.close()
                if (res.data == "0") {
                    this.utils.alert(this, "该手机号已被注册，请您刷新重试")
                } else if (res.data == "-1") {
                    this.utils.alert(this, "添加失败，请您稍后重试或直接联系客服人员")
                } else {
                    this.utils.setItem("kxUserID", res.data)
                    this.$router.push({ path: '/addperson' })
                }
              },
              fail: ()=> {
                this.Indicator.close()
                this.utils.alert(this, '网络连接失败，请刷新重试')
              }
            })                
          }
        },
        forgetPassword: function (){
          if(this.tel.length < 1){
            this.utils.alert(this, '请输入手机号码')
          }else if (this.utils.checkTel(this.tel)) {
              this.Indicator.open();
              var param = new URLSearchParams();
              param.append("phone", this.tel);
              this.utils.ajax({
                name: this,
                uri: 'Wangjimima',
                method: 'post',
                params: param,
                success: res=> {
                  this.Indicator.close();
                  let data = res.data
                  if (data == "-1") {
                      this.utils.alert(this, "您还不是凯行网的会员，请先注册")
                  } else if (data == "0") {
                      this.utils.alert(this, "短信发送失败，请联系服务人员")
                  } else if (data == "1") {
                      this.utils.alert(this, "您的密码已经发送到您的手机，请注意查收")
                  }
                },
                fail: ()=>{
                  this.Indicator.close();
                  this.utils.alert(this, "网络连接失败，请刷新重试")
                }
              })
          } else {
              this.utils.alert(this, "请输入正确的手机号")
          }
        }
      },
      created : function (){
        this.amountPrice = parseInt(this.utils.getItem('orderprice')) + parseInt(this.utils.getItem('ordertax'))
        let uid = this.utils.getItem("kxUserID")
        if(uid && uid != 'null'){
          this.$router.back(-1)
        }
      }
    }
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
  .addlinkman-box{
    position: relative;
    height: 100%;
    background-color: #f4f4f4;
    .header{
      background-color: #f00000;
    }
    .person-form{
      position: absolute;
      left: 0;
      top: .9rem;
      width: 100%;
      z-index: 1;
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
      font-size: .24rem;
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
          overflow: hidden;
          span{
            width: 1.5rem;
          }
          input{
            width: 5rem;
            height: .8rem;
            line-height: .5rem;
            box-sizing: border-box;
            border: 0;
            font-size: .28rem;
          }
          input::placeholder{
            color: #aaa;
            font-size: .28rem;
            line-height: .46rem;
          }
        }
        .text-item:last-child{
          border: 0;
        }
        .text-items{
          height: .8rem;
          line-height: .8rem;
          text-align: right;
          padding: 0 .2rem;
          text-decoration: underline;
          color: #aaa;
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
    .amount{
      position: absolute;
      left: 0;
      bottom: 2.4rem;
      width: 100%;
      height: .8rem;
      background-color: #fff;
      padding: 0 .2rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      span{
        color: #f00000;
        font-size: .4rem;
        line-height: .8rem;
      }
      a{
        width: 2rem;
        height: .6rem;
        background-color: #f00000;
        color: #fff;
        font-size: .32rem;
        text-align: center;
        margin-top: .1rem;
        line-height: .6rem;
        border-radius: .1rem;
      }
    }
    .footer{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>
