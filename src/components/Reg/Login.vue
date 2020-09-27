<template>
  <div id="Login" v-if="isShow" @click="closeLogin" class="login-box">
    <div class="login-layer">
      <div class="title">HI.登录/注册会员</div>
      <div class="form">
        <input type="tel" class="text" v-model="phone" autocomplete="off" placeholder="手机号" maxlength="11">
        <input type="password" class="text" v-model="password" autocomplete="off" placeholder="密码" maxlength="20">
        <div class="keep-pass"><el-checkbox v-model="checked">保持登录状态</el-checkbox></div>
        <div class="btn" @click="login">登录<mt-spinner v-if="wait" class="wait" color="#fff" :type="3"></mt-spinner></div>
        <div class="forget" @click="forgetPassword">忘记密码</div>
      </div>
      <div class="join" @click="registerEvent">加入凯行</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['showLogin'],
    name: 'Login',
    data() {
      return {
        isShow: false,
        checked: true,
        wait: false,
        phone: '',
        password: ''
      }
    },
    methods: {
      registerEvent: function (){
        this.$emit('toRegister', true)
      },
      closeLogin: function (e){
        if(e.target.id === 'Login'){
          this.$emit('closeLogin', false)
        }
      },
      forgetPassword: function (){
        if(this.phone.length < 1){
          this.utils.alert(this, '请输入手机号码')
        }else if (this.utils.checkTel(this.phone)) {
            this.Indicator.open();
            var param = new URLSearchParams();
            param.append("phone", this.phone);
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
      },
      login: function(){
        if(this.phone.length != 11){
            this.utils.alert(this, '请输入11位手机号码')
        }else if (!this.utils.checkTel(this.phone)) {
            this.utils.alert(this, "请输入正确的手机号")
        }else if(this.password.length < 1){
            this.utils.alert(this, '请输入密码')
        }else if(!this.wait){
          this.wait = true
          let amount = { phone: this.phone, pass: this.password }
          this.utils.ajax({
            name: this,
            uri:  'IsLogin',
            params: { params: amount },
            success: res=>{
              console.log(res)
              this.wait = false
              if(res.status === 200 && res.data > 0){
                this.utils.setItem('kxUserID',res.data+"")
                if(this.checked){
                  this.utils.setItem('kxAmount',JSON.stringify(amount))
                }
                location.reload()
              }else {
                this.utils.alert(this, '账号或密码错误！')
              }
            },
            complete: ()=> {
              this.wait = false
            }
          })
        }        
      }
    },
    created() {
      let amount = this.utils.getItem('kxAmount')
      if(amount){
        let am = JSON.parse(amount)
        this.phone = am.phone
        this.password = am.pass
      }
    },
    watch: {
      showLogin(val){
        this.isShow = val
      }
    }
  }
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
  .login-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background-color: rgba(0,0,0,.6);
    .login-layer{
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      width: 6rem;
      height: 6.8rem;
      margin-left: -3rem;
      margin-top: -3.4rem;
      border-radius: .1rem;
      box-sizing: border-box;
      padding: .3rem;
      .title{
        color: #333;
        font-size: .28rem;
        font-weight: bold;
        line-height: .3rem;
      }
      .form{
        margin-top: .2rem;
        padding-bottom: .3rem;
        border-bottom: .02rem solid #ddd;
        .text{
          outline: none;
          width: 100%;
          border: .02rem solid #ddd;
          height: .6rem;
          line-height: .6rem;
          margin: .14rem 0;
          border-radius: .06rem;
          text-indent: .2rem;
          font-size: .24rem;
        }
        .keep-pass{
          font-size: .24rem;
          color: #666;
          .is-focus{
            .el-checkbox__inner{
              border-color: #999;
            }
          }
          .is-checked{
            .el-checkbox__inner{
              background-color: #f40000;
              border-color: #f40000;
            }
            .el-checkbox__label{
              color: #333;
            }
          }
          .el-checkbox__label{
            font-size: .24rem;
            color: #666;
          }
        }
        .btn{
          position: relative;
          width: 100%;
          height: .6rem;
          line-height: .6rem;
          margin-top: .4rem;
          color: #fff;
          background-color: #f40000;
          text-align: center;
          font-size: .28rem;
          border-radius: .06rem;
          .wait{
            position: absolute;
            display: inline-block;
            width: .3rem;
            height: .3rem;
            margin-left: .2rem;
            top: .15rem;
            .mint-spinner-fading-circle{
              width: .3rem !important;
              height: .3rem !important;
            }
          }
        }
        .btn:active{
          background-color: #CE0000;
        }
        .forget{
          margin-top: .2rem;
          font-size: .24rem;
          line-height: .26rem;
          color: #666;
          background: url($imguri + 'question.png') no-repeat left center;
          background-size: .24rem .24rem;
          padding-left: .3rem;
        }
      }
      .join{
        margin-top: .8rem;
        color: #fff;
        background-color: #494949;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        font-size: .28rem;
        border-radius: .06rem;
      }
    }
  }
</style>
