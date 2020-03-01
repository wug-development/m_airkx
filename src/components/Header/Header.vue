<template>
  <div id="Header" class="header-box">
    <div class="logo"><img src="../../assets/images/logo.png" alt=""> </div>
    <div class="tel" v-if="showTel"><a href="tel:4007227722">400-722-7722</a></div>
    <div class="more">
      <div :class='"login "+loginClass' @click="openLogin">
        <div class="my"><img src="../../assets/images/m-kx_03.png" alt=""></div>
      </div>
      <img @click="showLayer" class="menu" src="../../assets/images/m-kx_06.png" alt="">
    </div>
    <Menu :showMenu="showMenu" v-on:closelayer="closeLayer"></Menu>
    <Login :showLogin="showLogin" v-on:closeLogin="closeLogin" v-on:toRegister="toRegister"></Login>
    <Register :showRegister="showRegister" v-on:closeRegister="closeRegister" v-on:toLogin="toLogin"></Register>
  </div>
</template>

<script>
  import Menu from './Menu.vue'
  import Login from '../Reg/Login.vue'
  import Register from '../Reg/Register.vue'

  export default {
    props: ['isTel'],
    name: 'Header',
    data() {
      return {
        isShow: 'none',
        showTel: false,
        showMenu: false,
        showLogin: false,
        showRegister: false,
        username: '登录',
        loginClass: ''
      }
    },
    components: {
      Menu,
      Login,
      Register
    },
    methods: {
      showLayer: function (){
        this.showMenu = true
      },
      closeLayer: function(val){
        this.showMenu = val
      },
      closeLogin: function(val){
        this.showLogin = val
      },
      openLogin: function(){
        if(this.loginClass){
          this.$router.push({
            path: '/my'
          })
        }else{
          this.showLogin = true
        }        
      },
      toRegister: function(){
        this.showLogin = false
        this.showRegister = true
      },
      closeRegister: function(val){
        this.showRegister = val
      },
      toLogin: function(){
        this.showLogin = true
        this.showRegister = false
      }
    },
    created: function (){
      this.showTel = this.isTel
    },
    beforeMount(){
        var _this=this;
        var userID=this.utils.getItem("kxUserID");
        if(userID && userID != "null"){
            let param = new URLSearchParams();
            param.append("userID", userID);
            this.utils.ajax({
              name: this,
              uri: 'SendUserInfoServlet',
              method: 'post',
              params: param,
              success: res=>{
                if(res.status === 200){
                  _this.username = res.data.UserName
                  _this.loginClass = 'login-cur'              
                }
              }
            })
        }
    }
  }
</script>

<style lang="scss">
  .header-box{
    background: #fff;
    width: 7.5rem;
    height: .9rem;
    box-shadow: 0 0 .15rem #ccc;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: .13rem .2rem;
    color: #333;
    .logo{
      width: 1.89rem;
      height: .64rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .tel{
      line-height: .28rem;
      font-size: .28rem;
      padding: .21rem 0;
    }
    .more{
      display: flex;
      flex-wrap: wrap;
      .login{
        display: flex;
        flex-wrap: wrap;
        position: relative;
        align-items: center;
        margin-right: .32rem;
        .btn-login{
          line-height: .32rem;
          height: .3rem;
          margin: .2rem;
          font-size: .28rem;
          max-width: 1.2rem;
          overflow: hidden;
        }
        .my{
          text-align: center;
          border-radius: .1rem;
          height: 100%;
          img{
            width: .51rem;
            height: .51rem;
            margin-top: .065rem;
          }
        }
      }
      .login-cur{
        .btn-login{
          color: #f29c9f;
        }
        .my{
          background-color: #f29c9f;
        }
      }
      .menu{
        width: .49rem;
        height: .39rem;
        margin: .125rem .08rem .125rem 0;
      }
    }
  }
</style>
