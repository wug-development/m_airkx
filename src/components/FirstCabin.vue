<template>
    <div id="FirstCabin" class="firstcabin-box">
        <Header isTel="true"></Header>
        <div>
            <img src="../assets/images/firstcb_02.png" alt="">
        </div>
        <div class="fimg">
            <img src="../assets/images/firstcb_05.png" alt="">
        </div>
        <div class="fimg">
            <img src="../assets/images/firstcb_08.png" alt="">
        </div>
        <div class="fimg">
            <img src="../assets/images/firstcb_10.png" alt="">
        </div>
        <div class="fimg">
            <img src="../assets/images/firstcb_12.png" alt="">
        </div>
        <div class="fimg">
            <img src="../assets/images/firstcb_15.png" alt="">
        </div>
        <Service></Service>
        <Footer></Footer>
    </div>
</template>

<script>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
import Footer from '../components/Footer/Footer.vue'
import Header from '../components/Header/Header.vue'
import Service from '../components/Footer/ServiceNew.vue'

export default {
    data () {
        return {}
    },
    components: {
      Header,
      Footer,
      Service
    },
}
</script>

<style lang="scss">
.firstcabin-box{
    margin: 0;
    background-color: #fff;
    img{
        display: block;
        width: 100%;
    }
    .fimg{
        margin-top: .32rem;
        padding: 0 .24rem;
    }
    .service-box{
        margin-top: .48rem;
        background-color: #fafafa;
    }
}
</style>