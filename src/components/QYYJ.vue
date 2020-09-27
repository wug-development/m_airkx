<template>
    <div id="QYYJ" class="qyyj-box">
        <Header isTel="true"></Header>
        <div class="fc-himg">
            <img :src='imguri + "qyyj_02.png"' alt="">
        </div>
        <div class="fc-content">
            <div class="fimg">
                <img :src='imguri + "qyyj_05.png"' alt="">
                <div class="f-content">
                    <div class="f-title">可靠的信用资质</div>
                    <div class="f-text">我公司是政府采购机票的定点单位，具备国际航协及国内航协的认可资质，更有近500余家航空公司的机票代理授权协议</div>
                </div>
            </div>
            <div class="fimg">
                <img :src='imguri + "qyyj_08.png"' alt="">
                <div class="f-content">
                    <div class="f-title">方便快捷的服务</div>
                    <div class="f-text">平台提供24小时不间断自主查询和预订服务的同时，更有客服专员7X24小时一对一服务，一个电话，一条信息随时随地为您解决订票、出票、改期及退票等问题</div>
                </div>
            </div>
            <div class="fimg">
                <img :src='imguri + "qyyj_10.png"' alt="">
                <div class="f-content">
                    <div class="f-title">灵活的结算周期</div>
                    <div class="f-text">公司提供自然月结账模式，更有根据情况提供最长6个月的结算周期；先出票后付款，月底账单一目了然，信用卡、微信、支付宝、支票、公务卡、网上转账等多种支付方式</div>
                </div>
            </div>
        </div>
        <div class="qy-process">
            <div class="process-title">企业月结的流程</div>
            <ul class="process-list">
                <li class="process-item">
                    <div class="icon-yj yj-right"><img class="yjimg1" :src='imguri + "yj_15.png"' alt=""></div>
                    <div class="item-text">与客服专员联系沟通，签订机票预订服务协议书</div>
                </li>
                <li class="process-item">
                    <div class="icon-yj yj-right"><img class="yjimg2" :src='imguri + "yj_24.png"' alt=""></div>
                    <div class="item-text">登录自己邮箱根据凯行网发送的链接设定机票预订平台登录密码</div>
                </li>
                <li class="process-item">
                    <div class="icon-yj"><img class="yjimg3" :src='imguri + "yj_18.png"' alt=""></div>
                    <div class="item-text">登录平台进行机票的查询及预订（也可通过联系客服专员人工预订）</div>
                </li>
            </ul>
            <ul class="process-list">
                <li class="process-item">
                    <div class="icon-yj yj-right"><img class="yjimg1" :src='imguri + "yj_15.png"' alt=""></div>
                    <div class="item-text">接收出票信息的短信或邮件通知（便可愉快乘机）</div>
                </li>
                <li class="process-item">
                    <div class="icon-yj yj-right"><img class="yjimg2" :src='imguri + "yj_24.png"' alt=""></div>
                    <div class="item-text">退票、改期、轻松如意</div>
                </li>
                <li class="process-item">
                    <div class="icon-yj"><img class="yjimg3" :src='imguri + "yj_18.png"' alt=""></div>
                    <div class="item-text">月底账单一目了然，确认后支付</div>
                </li>
            </ul>
        </div>
        <div class="qy-comper">
            <div class="comper-title">合作伙伴</div>
            <ul class="comper-list">
                <li class="comper-item">
                    <img class="img1" :src='imguri + "m-kx_27.png"' alt="">
                </li>
                <li class="comper-item">
                    <img class="img2" :src='imguri + "m-kx_21.png"' alt="">
                </li>
                <li class="comper-item">
                    <img class="img3" :src='imguri + "m-kx_24.png"' alt="">
                </li>
                <li class="comper-item">
                    <img class="img4" :src='imguri + "m-kx_39.png"' alt="">
                </li>
                <li class="comper-item">
                    <img class="img5" :src='imguri + "m-kx_33.png"' alt="">
                </li>
                <li class="comper-item">
                    <img class="img6" :src='imguri + "m-kx_36.png"' alt="">
                </li>
                <li class="comper-item">
                    <img class="img7" :src='imguri + "m-kx_50.png"' alt="">
                </li>
                <li class="comper-item">
                    <img class="img8" :src='imguri + "m-kx_47.png"' alt="">
                </li>
                <li class="comper-item">
                    <img class="img9" :src='imguri + "m-kx_44.png"' alt="">
                </li>
            </ul>
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
@import '@/assets/sass/set.scss';
.qyyj-box{
    margin: 0;
    background-color: #f4f4f4;
    .fc-himg{
        margin: 0;
        img{
            display: block;
            width: 100%;
        }
    }
    .fc-content{
        padding: 0 .24rem;
        img{
            display: block;
            width: 100%;
        }
        .fimg{
            margin-top: .32rem;
            border-radius: .08rem;
            overflow: hidden;
            box-shadow: .06rem .06rem .04rem #eee;
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
    .qy-process{
        margin-top: .48rem;
        background-color: #fff;
        padding-bottom: .8rem;
        .process-title{
            font-size: .36rem;
            text-align: center;
            padding-top: .7rem;
            padding-bottom: .2rem;
        }
        .process-list{
            display: flex;
            padding: 0 .24rem;
            box-sizing: border-box;
            justify-content: space-between;
            margin-top: .3rem;
            .process-item{
                width: 2.2rem;
                text-align: center;
                .icon-yj{
                    margin: 0 auto;
                    width: 1.54rem;
                    height: 1.54rem;
                    background: url($imguri + 'index-yj-bg.png') no-repeat center;
                    background-size: 100%;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    .yjimg1{
                        width: .7rem;
                    }
                    .yjimg2{
                        width: .76rem;
                    }
                    .yjimg3{
                        width: .76rem;
                    }
                }
                .yj-right::after {
                    content: '';
                    position: absolute;
                    top: .7rem;
                    left: 1.86rem;
                    display: block;
                    width: .1rem;
                    height: .1rem;
                    border-right: .04rem solid #888;
                    border-top: .04rem solid #888;
                    -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                }
                .item-text{
                    font-size: .2rem;
                    color: #333;
                    line-height: .3rem;
                    margin-top: .14rem;
                }
            }
        }
    }
    .qy-comper{
        padding-top: .8rem;
        .comper-title{
            font-size: .36rem;
            text-align: center;
        }
        .comper-list{
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            .comper-item{
                width: 2.5rem;
                margin-top: .5rem;
                img{
                    display: block;
                    margin: 0 auto;
                }
                .img1{ width: 1.76rem; }
                .img2{ width: 1.45rem; }
                .img3{ width: 1.15rem; }
                .img4{ width: 1.8rem; }
                .img5{ width: 1.5rem; }
                .img6{ width: 1.34rem; }
                .img7{ width: 1.46rem; }
                .img8{ width: 1.62rem; }
                .img9{ width: 1.5rem; }
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