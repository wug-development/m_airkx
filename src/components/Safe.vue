<template>
  <div id="Safe" class="safe-box">
    <Header></Header>
    <div class="banner">
      <img src="../assets/images/safe/safe-banner.png" alt="">
    </div>
    <div class="info">
      <img src="../assets/images/safe/safe-body.png" alt="">
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header/Header.vue'
  import Footer from '../components/Footer/Footer.vue'

  export default {
    name: 'Safe',
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
  .safe-box{
    img{
      display: block;
      width: 7.5rem;
    }
    .info{
      margin-top: .3rem;
    }
  }
</style>
