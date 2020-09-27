<template>
    <div id="ZFCG" class="zfcg-box">
        <Header isTel="true"></Header>
        <div>
            <img :src='imguri + "zfcg_02.png"' alt="">
        </div>
        <div class="fc-content">
            <div class="f-other">
                <div class="f-title">政府采购定点机票代理商</div>
                <div class="f-text">根据中国民用航空局印发的《关于加强公务机票管理有关事项的通知》以及（财库{2014}33号文件，以下简称《通知》）中明确的购票人在国内出差、因公临时出国时所购买的机票规定。中国财政部和民用航空局经过严格的审核，筛选出政府机票采购供应商</div>
            </div>
            <div class="fimg">
                <img :src='imguri + "zfcg_05.png"' alt="">
                <div class="f-content">
                    <div class="f-title">可靠的信用资质</div>
                    <div class="f-text">我公司是政府采购机票的定点单位，具备国际航协及国内航协的认可资质，同时具有中航鑫港公司的政府采购机票担保函</div>
                </div>
            </div>
            <div class="fimg">
                <img :src='imguri + "zfcg_08.png"' alt="">
                <div class="f-content">
                    <div class="f-title">公务机票采购优惠</div>
                    <div class="f-text">各政府部门、科学院校、医院等事业单位。持有公务卡的公务员、老师、医生等相关人员；在我单位购买机票可享受全价票8.8折，折扣票9.5折的优惠</div>
                </div>
            </div>
            <div class="fimg">
                <img :src='imguri + "zfcg_10.png"' alt="">
                <div class="f-content">
                    <div class="f-title">公务卡简捷支付</div>
                    <div class="f-text">购买机票可以使用公务卡进行网上无卡支付，我们也可以上门刷卡支付</div>
                </div>
            </div>
            <div class="fimg">
                <img :src='imguri + "zfcg_12.png"' alt="">
                <div class="f-content">
                    <div class="f-title">可签约月结服务</div>
                    <div class="f-text">我公司提供政府单位签约进行先乘机后付款月结服务</div>
                </div>
            </div>
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
.zfcg-box{
    margin: 0;
    background-color: #fefefe;
    img{
        display: block;
        width: 100%;
    }
    .fc-content{
        padding: 0 .24rem;
        .f-other{
            margin-top: .6rem;
            padding-bottom: .2rem;
            .f-title{
                text-align: center;
                font-size: .4rem;
            }
            .f-text{
                margin-top: .4rem;
                font-size: .2rem;
                color: #888;
                text-align: center;
                line-height: .36rem;
            }
        }
        .fimg{
            margin-top: .32rem;
            border-radius: .08rem;
            overflow: hidden;
            box-shadow: .06rem .06rem .04rem #f6f6f6;
            .f-content{
                padding: .4rem .5rem;
                box-sizing: border-box;
                background-color: #fff;
                .f-title{
                    font-size: .34rem;
                    font-weight: bold;
                }
                .f-text{
                    font-size: .22rem;
                    margin-top: .2rem;
                    color: #888;
                }
            }
        }
    }
    .service-box{
        margin-top: .48rem;
        padding-top: .4rem;
        background-color: #fff;
    }
}
</style>