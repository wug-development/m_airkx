<template>
  <div id="BackHeader" class="backheader-box">
    <div class="header-back" @click="backEvent"><img src="../../assets/images/back.png" alt=""> </div>
    <div class="header-ptitle" v-if="ptitle" >{{ptitle}}</div>
    <div class="header-more">
      <img @click="showLayer" class="menu" src="../../assets/images/menu.png" alt="">
    </div>
    <Menu :showMenu="showMenu" v-on:closelayer="closeLayer"></Menu>
  </div>
</template>

<script>
  import Menu from './Menu.vue'

  export default {
    props: ['pageTitle'],
    name: 'BackHeader',
    data() {
      return {
        isShow: 'none',
        ptitle: '',
        showMenu: false
      }
    },
    components: {
      Menu
    },
    methods: {
      showLayer: function (){
        this.showMenu = true
      },
      closeLayer: function(val){
        this.showMenu = val
      },
      backEvent: function(){
        this.$router.back(-1)
      }
    },
    created: function (){
      this.ptitle = this.pageTitle
    }

  }
</script>

<style lang="scss">
  .backheader-box{
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
    .header-back{
      width: .64rem;
      height: .64rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .header-ptitle{
      font-size: .28rem;
      line-height: .64rem;
      font-weight: bold;
    }
    .header-more{
      display: flex;
      flex-wrap: wrap;
      .login{
        display: flex;
        flex-wrap: wrap;
        .btn-login{
          line-height: .3rem;
          padding: .2rem;
        }
        .my{
          width: .43rem;
          height: .39rem;
          margin-top: .125rem;
          background-color: #e5e5e5;
          text-align: center;
          border-radius: .1rem;
          img{
            margin-top: .045rem;
            width: .26rem;
            height: .3rem;
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
        width: .67rem;
        height: .49rem;
        margin: .075rem 0;
      }
    }
  }
</style>
