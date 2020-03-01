<template>
  <div id="ServiceNew" class="service-box">
    <div class="info">
      <div class="title"><span>—</span> 价格低 服务好 专注机票二十年 <span>—</span></div>
      <ul>
        <li><div class="serviceimg vip"></div><span> 一级代理商<br/>二十年品牌</span></li>
        <li><div class="serviceimg phone"></div><span>先出票后付款<br/>全程短信通知</span></li>
        <li><div class="serviceimg safe"></div><span>安全付款<br/>支持上门刷卡</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ServiceNew',
    components: {

    }
  }
</script>

<style lang="scss">
  .service-box{
    padding: .1rem .3rem .5rem .3rem;
    border-bottom: .01rem solid #eee;
    font-size: .24rem;
    .info{
        color: #666;
        .title{
            font-size: .24rem;
            line-height: .4rem;
            width: 100%;
            color: #333;
            text-align: center;
            span{
                color: #bbb;
            }
        }
        ul{
            margin-top: .6rem;
            line-height: .5rem;
            display: flex;
            justify-content: center;
            li{
                position: relative;
                font-size: .24rem;
                width: 2.2rem;
                height: .5rem;
                border-left: .02rem solid #ddd;
                text-align: center;
                line-height: .4rem;
                span{
                    position: absolute;
                    width: 100%;
                    left: 0;
                    top: -.14rem;
                }
                .serviceimg{
                    position: absolute;
                    left: 0;
                    top: -.44rem;
                    width: 100%;
                    height: .24rem;
                }
                .vip{                    
                    background: url('../../assets/images/air_service_vip.png') no-repeat center;
                    background-size: auto 100%;
                }
                .phone{                    
                    background: url('../../assets/images/air_service_phone.png') no-repeat center;
                    background-size: auto 100%;
                }
                .safe{                    
                    background: url('../../assets/images/air_service_card.png') no-repeat center;
                    background-size: auto 100%;
                }
            }
            li:first-child{
                border: 0;
            }
        }
    }
  }
</style>
