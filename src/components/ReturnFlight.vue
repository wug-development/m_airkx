<template>
  <div id="ReturnFlight" class="returnflight-box">
    <div class="flist-tlist">
      <div class="flist-head">
        <Header class="flight-header" :pageTitle="pageTitle"></Header>
        <div class="flist-body-pd">
          <div class="flist-search">
            <label>{{flightType}}</label>
            <span>{{utils.dateFormat(startDate, 'MM月dd日')}}</span>
            <span>{{startTime}}</span>
            <span>{{startCode}}</span>
          </div>
        </div>
      </div>
      <div class="flist-body">
        <ul class="flist-list">
          <li class="flist-item" v-for="(titem, index) in backList" :key="index">
            <div v-for="(item, i) in titem" :key="i" :class='i!=0?"itemboxs":"itembox"' v-if="i == 0 || index == othernum">
              <div class="lab">
                <div class="labs">
                  <img :src="item.airinfo.Picture" alt="">
                  <span>{{item.AirCode}}</span>
                  <label @click="showTgqLayer(item.piaojia.beizhu)">退改签规定</label>
                  <label>税金￥{{item.jipiao.WFS}}</label>
                </div>
                <div class="btnprice">
                  <span>￥<label>{{item.piaojia.TicketPrice}}</label></span>
                  <a @click="selFlight(item.AirID, index)">预定</a>
                </div>
              </div>
              <div class="info">
                <div class="info-go">
                  <div class="time">{{item.STime}}</div>
                  <div class="name">{{item.SPortName}}</div>
                </div>
                <div class="change"></div>
                <div class="info-to">
                  <div class="time">{{item.ETime}}</div>
                  <div class="name">{{item.EPortName}}</div>
                </div>
              </div>             
              <template v-if="item.otherFlight && item.otherFlight.length">
                <div v-for="(flight, j) in item.otherFlight" :key="j" class="info info-change">
                  <div class="change-name"><span>中转{{j+1}}次</span></div>
                  <div class="info-go">
                    <div class="time">{{flight.STime}}</div>
                    <div class="name">{{flight.SPortName}}</div>
                  </div>
                  <div class="change"></div>
                  <div class="info-to">
                    <div class="time">{{flight.ETime}}</div>
                    <div class="name">{{flight.EPortName}}</div>
                  </div>
                </div>              
              </template> 
            </div>
            <template v-if="titem && titem.length>1">
              <div v-if="index == othernum" class="moreUp" @click="othernum=-1">
                <div></div>
              </div>
              <div v-else class="moreDown" @click="othernum=index"></div>
            </template>
          </li>
        </ul>
        <Footer></Footer>
      </div>
    </div>
    <div v-if="tgqLayer" @click="closeTgqLayer" class="tgqlayer">
      <div class="tgqbox">
        <div v-html="beizhu">{{beizhu}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header/BackFlightHeader.vue'
  import Footer from '../components/Footer/Footer.vue'

  export default {
    name: 'FlightList',
    data() {
      return {
        pageTitle: '航班列表',
        tgqLayer: false,
        notFind: false,
        flightType: '去程已选定',
        startCity: '',
        endCity: '',
        startDate: '',
        endDate: '',
        startCode: '',
        startTime: '',
        startList: [],
        backList: [],
        flightList: [],
        isLoading: false,
        beizhu: '',
        othernum: 0,
      }
    },
    components: {
      Header,
      Footer
    },
    methods: {
      showTgqLayer: function (val) {
        this.tgqLayer = true
        this.beizhu = val.replace(/[\r\n]/g,'<br/>')
      },
      closeTgqLayer: function () {
        this.tgqLayer = false
      },
      selFlight: function(id, i){
        this.utils.setItem('bairid', id)
        this.$router.push({ path: '/flightinfo' })
      }
    },
    created: function() {
        this.startList = JSON.parse(this.utils.getItem("startFlight"))
        this.backList = JSON.parse(this.utils.getItem("backFlight"))
        this.startCode = this.utils.getItem("saircode")
        this.startTime = this.utils.getItem("sairtime")
        this.startDate = this.utils.getItem("stime")
        this.pageTitle = '返：'+ this.utils.getItem("ecity")+'-'+this.utils.getItem("scity")
    }
  }

</script>

<style lang="scss">
  .returnflight-box{
    min-height: 100%;
    height: 100%;
    background: linear-gradient(#E70000 1rem, #EFEFEF 5rem);
    overflow: hidden;
    .flist-tlist{
      position: relative;
      height: 100%;
      .flist-head{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1.6rem;
        overflow: hidden;
        .flist-body-pd{
          padding: 0 .1rem .1rem .1rem;
          .flist-search{
            height: .6rem;
            width: 100%;
            background-color: rgba(255,255,255,.6);
            display: flex;
            label{
              margin: .1rem 0 0 .12rem;
              border: .02rem solid #f00000;
              height: .42rem;
              width: 1.6rem;
              line-height: .42rem;
              text-align: center;
              color: #f00000;
              border-radius: .08rem;
              box-sizing: border-box;
              font-size: .28rem;
            }
            span{
              line-height: .62rem;
              margin-left: .24rem;
              color: #444;
              font-size: .28rem;
            }
          }
        }
      }
      .flist-body{
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 1.6rem;
        width: 100%;
        height: 100%;
        overflow: scroll;
        padding-bottom: 1.6rem;
        box-sizing: border-box;
        .flist-list{
          padding: 0 .2rem 0 .2rem;
          box-sizing: border-box;
          width: 100%;
          min-height: 9rem;
          .flist-item{
            background-color: #fff;
            margin-bottom: .4rem;
            border-radius: .1rem;
            box-sizing: border-box;
            position: relative;
            padding-bottom: .2rem;
            .itembox{
              padding: .1rem .1rem .2rem .2rem;
              background-color: #fff;
              border-radius: .1rem;
              box-sizing: border-box;
            }
            .itemboxs{
              border-radius: .1rem;
              padding: .1rem .1rem .2rem .2rem;
              background-color: #e4e4e4;
              margin-bottom: .1rem;
              box-sizing: border-box;
            }
            .lab{
              display: flex;
              justify-content: space-between;
              color: #999;
              font-size: .24rem;
              height: .5rem;
              .labs{
                display: flex;
                line-height: .36rem;
                margin-top: .1rem;
                img{
                  height: .36rem;
                  max-width: .6rem;
                }
                span{
                  margin-left: .1rem;
                }
                label{
                  margin-left: .1rem;
                  margin-top: .04rem;
                  border-left: .01rem solid #999;
                  height: .28rem;
                  line-height: .28rem;
                  padding-left: .1rem;
                }
              }
            }
            .btnprice{
              color: #f00000;
              display: flex;
              font-size: .3rem;
              span{
                font-size: .24rem;
                line-height: .5rem;
                label{
                  font-size: .32rem;
                }
                margin-right: .1rem;
              }
              a{
                display: block;
                background-color: #f00000;
                color: #fff;
                border-radius: .1rem;
                width: 1rem;
                height: .5rem;
                line-height: .52rem;
                text-align: center;
                box-sizing: border-box;
              }
            }
            .info{
              display: flex;
              justify-content: center;
              height: 1.2rem;
              margin-top: .1rem;
              .info-go{
                font-size: .26rem;
                color: #999;
                text-align: center;
                width: 2rem;
                overflow: hidden;
                max-width: 2.4rem;
                .time{
                  font-size: .32rem;
                  color: #333;
                  line-height: .6rem;
                  height: .6rem;
                }
                .name{
                  width: 2rem;
                  height: .4rem;
                  line-height: .4rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space:nowrap;
                }
              }
              .info-to{
                font-size: .26rem;
                color: #999;
                text-align: left;
                width: 2rem;
                overflow: hidden;
                max-width: 2.4rem;
                .time{
                  font-size: .32rem;
                  color: #333;
                  line-height: .6rem;
                  height: .6rem;
                  span{
                    font-size: .2rem;
                    color: #999;
                  }
                }
                .name{
                  width: 2rem;
                  height: .4rem;
                  line-height: .4rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space:nowrap;
                }
              }
              .change{
                width: 2rem;
                height: 1rem;
                background: url('../assets/images/flight.png') no-repeat center;
                background-size: 1.35rem;
                color: #f7a461;
                text-align: center;
                font-size: .24rem;
              }
            }
            .info-change{
              position: relative;
              border-top: .02rem dotted #ccc;
              margin: 0;
              padding-top: .2rem;
              .change-name{
                position: absolute;
                left: 0;
                top: -.2rem;
                width: 100%;
                height: .4rem;
                line-height: .4rem;
                color: #f7a461;
                text-align: center;
                font-size: .24rem;
                span{
                  background-color: #fff;
                  padding: 0 .2rem;
                }
              }
            }
            .itemboxs{
              .change-name{
                span{
                  background-color: #e4e4e4;
                }
              }
            }
            .moreDown{
              position: absolute;
              left: 50%;
              bottom: 0;
              margin: 0 0 -.22rem -.12rem;
              padding: 0;
              width: 0;
              border-width: .24rem .24rem 0;
              border-color: #fff transparent transparent;
              border-style: solid;
            }
            .moreDown:after{
              content: '';
              position: absolute;
              left: -.12rem;
              top: -.24rem;
              width: 0;
              border-width: .12rem .12rem 0;
              border-color: #999 transparent transparent;
              border-style: solid;
            }
            .moreUp{
              position: absolute;
              left: 50%;
              bottom: 0;
              margin-left: -.06rem;
              width: 0;
              border-width: 0.12rem .12rem;
              border-color: transparent transparent #999;
              border-style: solid;
            }
          }
        }
      }
    }
    .tgqlayer{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba(0,0,0,.6);
      .tgqbox{
        background-color: #fff;
        border-radius: .1rem;
        padding: .2rem 0 0 0;
        box-sizing: border-box;
        height: 1.9rem;
        width: 6.4rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -3.2rem;
        margin-top: -.95rem;
        text-align: center;
        color: #777;
        line-height: .5rem;
        font-size: .28rem;
      }
    }
  }
</style>
