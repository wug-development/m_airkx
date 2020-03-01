<template>
  <div id="FlightInfo" class="flightinfo-box">
    <div class="finfo-tinfo">
      <Header class="flight-header" :pageTitle="pageTitle"></Header>
      <div class="finfo-body">
        <div class="finfo-body-pd">
          <div class="itembox">
            <div class="title">
              <div>去</div>
              <span>
                {{startDate}}&nbsp;&nbsp;
                {{startCity}}-{{endCity}}
              </span>
            </div>
            <div class="togolist">
              <div class="togoitem">
                <div class="time">
                  <div>{{startFlight.STime}}</div>
                  <div class="row"></div>
                  <div>{{startFlight.ETime}}</div>
                </div>
                <div class="col"></div>
                <div class="fline">
                  <div>{{startFlight.SPortName}}</div>
                  <div class="air">
                    <img :src="startFlight.airinfo.Picture" alt="">
                    {{startFlight.AirCode}}&nbsp;{{startFlight.airinfo.CompanyName}}&nbsp;&nbsp;{{startFlight.airtype.AirName || startFlight.Jixing }}
                  </div>
                  <div>{{startFlight.EPortName}}</div>
                </div>
              </div>
              <template v-if="startFlight.otherFlight.length">
                <div v-for="(item, index) in startFlight.otherFlight" :key="index">
                  <div class="changecity"><span></span>中转</div>
                  <div class="togoitem">
                    <div class="time">
                      <div>{{item.STime}}</div>
                      <div class="row"></div>
                      <div>{{item.ETime}}</div>
                    </div>
                    <div class="col"></div>
                    <div class="fline">
                      <div>{{item.SPortName}}</div>
                      <div class="air">
                        <img :src="startFlight.airinfo.Picture" alt="">
                        {{item.AirCode}}&nbsp;{{startFlight.airinfo.CompanyName}}&nbsp;&nbsp;{{item.Jixing}}
                      </div>
                      <div>{{item.EPortName}}</div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div v-if="flightType" class="itembox">
            <div class="title">
              <div>返</div>
              <span>
                {{endDate}}&nbsp;&nbsp;
                {{endCity}}-{{startCity}}
              </span>
            </div>
            <div class="togolist">
              <div class="togoitem">
                <div class="time">
                  <div>{{backFlight.STime}}</div>
                  <div class="row"></div>
                  <div>{{backFlight.ETime}}</div>
                </div>
                <div class="col"></div>
                <div class="fline">
                  <div>{{backFlight.SPortName}}</div>
                  <div class="air">
                    <img :src="backFlight.airinfo.Picture" alt="">
                    {{backFlight.AirCode}}&nbsp;{{backFlight.airinfo.CompanyName}}&nbsp;&nbsp;{{backFlight.airtype.AirName || backFlight.Jixing}}
                  </div>
                  <div>{{backFlight.EPortName}}</div>
                </div>
              </div>
              <template v-if="backFlight.otherFlight.length">
                <div v-for="(item, index) in backFlight.otherFlight" :key="index">
                  <div class="changecity"><span></span>中转</div>
                  <div class="togoitem">
                    <div class="time">
                      <div>{{item.STime}}</div>
                      <div class="row"></div>
                      <div>{{item.ETime}}</div>
                    </div>
                    <div class="col"></div>
                    <div class="fline">
                      <div>{{item.SPortName}}</div>
                      <div class="air">
                        <img :src="backFlight.airinfo.Picture" alt="">
                        {{item.AirCode}}&nbsp;{{backFlight.airinfo.CompanyName}}&nbsp;&nbsp;{{item.Jixing}}
                      </div>
                      <div>{{item.EPortName}}</div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="notice">
            <div class="btn">
              <div class="tgq">退改签规定</div>
              <div class="gp">购票须知</div>
            </div>
            <div class="info">
              <div v-html="beizhu">{{beizhu}}</div>
              <div>
                婴儿不能单独订票，一位成人 最多限带两名婴儿，儿童必须 有成人陪伴。如无成人陪伴请 在订单里备注。
              </div>
            </div>
          </div>
        </div>
        <div class="finfo-amount">
          <span>￥{{price}}</span>
          <span class="btn" @click="nextform">下一步</span>
        </div>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header/BackFlightHeader.vue'
  import Footer from '../components/Footer/Footer.vue'

  export default {
    name: 'FlightInfo',
    data() {
      return {
        pageTitle: '航班详情',
        tgqLayer: false,
        startDate: '',
        endDate: '',
        startFlight: {},
        backFlight: {},
        flightType: false,
        startID: 0,
        backID: 0,
        beizhu: '',
        price: 0,
        userID: ''
      }
    },
    components: {
      Header,
      Footer
    },
    methods: {
      nextform: function(){
        if(this.userID){
          this.$router.push({ path: '/addperson' })
        }else{
          this.$router.push({ path: '/addlinkman' })
        }
      }
    },
    created: function() {
        this.userID = this.utils.getItem("kxUserID") || ''
        let startList = JSON.parse(this.utils.getItem("startFlight"))
        let backList = JSON.parse(this.utils.getItem("backFlight"))
        this.startDate = this.utils.getItem("stime")
        this.endDate = this.utils.getItem("etime")
        this.pageTitle = this.utils.getItem("scity")+'<—>'+this.utils.getItem("ecity")
        this.startID = this.utils.getItem('sairid')
        this.backID = this.utils.getItem('bairid')
        this.startCity = this.utils.getItem("scity")
        this.endCity = this.utils.getItem("ecity")
        let tax = 0
        let that = this
        this.startFlight = startList[0].find(function(i){
          return i.AirID == that.startID
        })
        this.utils.setItem('startInfo', JSON.stringify(this.startFlight))
        let types = this.utils.getItem("type")
        if(types == true || types == 'true'){
          this.flightType = true
          this.backFlight = backList[0].find(function(i){
            return i.AirID == that.backID
          })
          tax = parseInt(this.startFlight.jipiao.WFS)
          this.price=parseInt(this.startFlight.piaojia.TicketPrice)
          this.utils.setItem('orderprice', this.price)
          this.utils.setItem('backInfo', JSON.stringify(this.backFlight))
          this.price += tax
        }else{
          tax = parseInt(this.startFlight.jipiao.DCS)
          this.price=parseInt(this.startFlight.piaojia.TicketPrice)
          this.utils.setItem('orderprice', this.price)
          this.price += tax
        }
        this.utils.setItem('ordertax', tax)
        this.beizhu = this.startFlight.piaojia.beizhu.replace(/[\r\n]/g,'<br/>')
    }
  }
</script>

<style lang="scss">
  .flightinfo-box{
    min-height: 100%;
    height: 100%;
    background: linear-gradient(#E70000 1rem, #EFEFEF 5rem);
    overflow: hidden;
    font-size: .24rem;
    .finfo-tinfo{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding-top: .9rem;
      box-sizing: border-box;
      overflow: hidden;
      .flight-header{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
      .finfo-body{
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: scroll;
        padding-bottom: .9rem;
        .finfo-body-pd{
          padding: 0 .1rem 0.1rem;
          min-height: 9rem;
        }
        .itembox{
          background-color: #fff;
          padding: .3rem .2rem;
          box-sizing: border-box;
          border-radius: .1rem;
          margin-bottom: .2rem;
          .title{
            font-size: .28rem;
            height: .6rem;
            line-height: .62rem;
            display: flex;
            div{
              color: #fff;
              background-color: #FE6600;
              width: .32rem;
              height: .32rem;
              line-height: .34rem;
              font-size: .28rem;
              padding: .02rem;
              text-align: center;
              margin-top: .14rem;
              margin-right: .1rem;
              box-sizing: border-box;
            }
            span{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .togolist{
            padding: .14rem 0 0 .6rem;
            box-sizing: border-box;
            .togoitem{
              display: flex;
              font-size: .28rem;
              box-sizing: border-box;
              .fline{
                .air{
                  color: #666;
                  font-size: .24rem;
                  height: .56rem;
                  line-height: .56rem;
                  img{
                    width: .24rem;
                    height: .24rem;
                  }
                }
              }
              .col{
                border-left: .02rem solid #ccc;
                margin: .2rem;
              }
              .time{
                .row{
                  height: .56rem;
                }
              }
            }
            .changecity{
              margin: .2rem 0 .2rem .8rem;
              box-sizing: border-box;
              display: flex;
              background-color: #FEE8EA;
              width: 4rem;
              height: .4rem;
              line-height: .4rem;
              color: #666;
              span{
                width: .2rem;
                height: .2rem;
                border-radius: .2rem;
                border: .02rem solid #FCA7A6;
                box-sizing: border-box;
                margin: .1rem;
              }
            }
          }
        }
        .notice{
          margin-top: .1rem;
          color: #f00000;
          padding-bottom: .2rem;
          .btn{
            display: flex;
            justify-content: space-between;
            padding: 0 .4rem;
            height: .6rem;
            line-height: .6rem;
            font-size: .28rem;
            .tgq{
              background: url('../assets/images/tgqnotice.png') no-repeat left center;
              background-size: .33rem .33rem;
              padding-left: .5rem;
            }
            .gp{
              background: url('../assets/images/gpxznotice.png') no-repeat left center;
              background-size: .29rem .33rem;
              padding-left: .5rem;
            }
          }
          .info{
            display: flex;
            justify-content: space-between;
            div{
              width: 3.5rem;
              border: .02rem solid #f00000;
              border-radius: .1rem;
              padding: .2rem;
              box-sizing: border-box;
              font-size: .24rem;
            }
          }
        }
        .finfo-amount{
          position: relative;
          background-color: #fff;
          color: #f00000;
          height: .8rem;
          line-height: .8rem;
          font-size: .32rem;
          padding-left: .2rem;
          box-sizing: border-box;
          .btn{
            position: absolute;
            top: .1rem;
            right: .1rem;
            background-color: #f00000;
            color: #fff;
            border-radius: .08rem;
            display: block;
            width: 1.8rem;
            height: .6rem;
            line-height: .6rem;
            text-align: center;
          }
        }
      }
    }
  }
</style>
