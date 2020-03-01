<template>
    <div id="Service" class="servicebox">
      <Header :pageTitle="pageTitle"></Header>
      <div class="service-bgimg">
        <img src="../assets/images/kefu-bg.png" alt="">
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
        pageTitle: '联系客服',
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
    background: linear-gradient(#fadfd8, #f8958b);
    .header-ptitle{
      color: #777;
    }
    .service-bgimg{
      width: 100%;
      img{
        width: 100%;
      }
    }
  }
</style>
