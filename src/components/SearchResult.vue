<template>
    <div id="SearchResult" class="search-result-box">
        <Header isTel="true"></Header>
        <div class="result-body">
            <div class="result-title">
                <div class="result-bar">
                    <div class="header-back" @click="goBack"><img src="../assets/images/back-white.png" alt=""> </div>
                    <div>去：{{scity}}-{{ecity}}</div>
                </div>
                <div class="ftype-date">
                    单程：{{sdate}}
                </div>
            </div>
            <div class="result-content">
                <div v-if="!loading">
                    <div class="result-icon">
                    <img src="../assets/images/icon-gth.png" alt="">
                    </div>
                    <div class="msg">很遗憾，未查到相关航班！</div>
                    <div v-if="orgtype == '0'">
                        <div class="reason">由于数据传输原因请联系客服人工查询</div>
                        <div class="phone">
                            <span><img src="../assets/images/icon-phone.png" alt=""></span>
                            <span><a href="tel:18601183538">18601183538</a></span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="reason">接口受限，请电话查询</div>
                        <div class="phone">
                            <span><img src="../assets/images/icon-phone.png" alt=""></span>
                            <span><a href="tel:4007227722">400 722 7722</a></span>
                        </div>
                    </div>
                    <div @click="goBack" class="btn-back">返 回</div>
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
        return {
            scity: '',
            ecity: '',
            sdate: '',
            orgtype: '',
            loading: true
        }
    },
    components: {
      Header,
      Footer,
      Service
    },
    methods: {
        goBack () {
            this.$router.back(-1)
        }
    },
    created () {
        this.scity = this.utils.getItem("scity")
        this.ecity = this.utils.getItem("ecity")
        this.sdate = this.utils.getItem("stime")
        this.orgtype = this.utils.getItem("orgtype")
        this.Indicator.open()
        setTimeout(()=>{
            this.Indicator.close()
            this.loading = false
        },2000)
    }
}
</script>

<style lang="scss">
.search-result-box{
    margin: 0;
    .header-box{
        box-shadow: none;
    }
    .result-body{
        padding: 0 .24rem;
        .result-title{
            border-radius: .08rem;
            background-color: #e5090b;
            color: #fff;
            font-size: .26rem;
            .result-bar{
                height: .9rem;
                line-height: .9rem;
                text-align: center;
                position: relative;
                .header-back{
                    position: absolute;
                    left: .36rem;
                    top: .24rem;
                    width: .44rem;
                    height: .44rem;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .ftype-date{
                height: .82rem;
                line-height: .82rem;
                padding-left: .36rem;
                background-color: rgba(255, 255, 255, 0.49);
            }
        }
        .result-content{
            text-align: center;
            padding-top: 1.4rem;
            padding-bottom: 1rem;
            min-height: 8rem;
            box-sizing: border-box;
            .result-icon{
                width: 1.1rem;
                height: 1.1rem;
                margin: 0 auto;
                border-radius: 200px;
                background-color: #e5090b;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    display: block;
                    height: .74rem;
                }
            }
            .msg{
                margin-top: .5rem;
                font-size: .36rem;
                color: #333;
            }
            .reason{
                margin-top: .56rem;
                font-size: .3rem;
                color: #888;
            }
            .phone{
                margin-top: .32rem;
                font-size: .44rem;
                color: #e5090b;
                display: flex;
                justify-content: center;
                line-height: .44rem;
                img{
                    width: .44rem;
                    position: relative;
                    margin-right: .1rem;
                    top: .02rem;
                }
                a{
                    color: #e5090b;
                }
            }
            .btn-back{
                margin: 1rem auto 0 auto;
                background-color: #e5090b;
                width: 2.5rem;
                height: .8rem;
                line-height: .8rem;
                border-radius: 40px;
                color: #fff;
                text-align: center;
                font-size: .32rem;
            }
        }
    }
    .service-box{
        padding-top: .4rem;
        background-color: #fafafa;
    }
}
</style>