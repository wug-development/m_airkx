<template>
  <div id="My" class="my-box">
    <Header :pageTitle="pageTitle" :showTel="showTel"></Header>
    <div class="my-head-box">
      <div class="set" @click="showLayer = true"><img :src='imguri + "set.png"' alt=""></div>
      <div class="head"></div>
      <div class="info">
        <span class="name">{{username}}</span>
        <span class="tel">{{tel}}</span>
      </div>
    </div>
    <div class="my-info-box">
      <div class="info">
        <div class="item">
          <div>
            <span>我的积分</span>
            <span>{{jifen}}分</span>
          </div>
          <div>
            <span>可用奖金</span>
            <span>{{jiangjin}}元</span>
          </div>
        </div>
        <div class="item">
          <div>
            <span>登录密码</span>
            <span>{{pass}}</span>
          </div>
          <div>
            <span>邮&nbsp;&nbsp;&nbsp;&nbsp;箱</span>
            <span>{{email}}</span>
          </div>
        </div>
      </div>
      <div class="order-person-box">
        <div class="tab">
          <span :class="tab==1?'cur':''" @click="selTab(1)">国际订单</span>
          <span :class="tab==2?'cur':''" @click="selTab(2)">国内订单</span>
          <span :class="tab==3?'cur':''" @click="selTab(3)">常用乘机人</span>
        </div>
        <div class="list-box">
          <div v-show="tab==1" class="order-box">
            <div class="no-order" v-if='isLoading'>
              加载中，请稍等...
            </div>
            <ul class="order-list" v-else-if="OrderList.length">
              <li class='order-item' v-for="(item, i) in OrderList" :key="i"  v-if="item.xingcheng.length" @click="showOrderInfo(item.OrderID)">
                <div class="flight" >{{item.OrderCode}}<div>{{item.xingcheng[0].StartCity}}-{{item.xingcheng[0].EndCity}}</div><span :class='"state "+item.style'>{{item.OrderState}}</span></div>
              </li>
            </ul>
            <div class="no-order" v-else>
              暂无任何订单，快快来订单开启您的旅行吧！
            </div>
          </div>
          <div v-show="tab==2" class="order-box">
            <ul class="order-list" v-if="gnOrderList.length">
              <li class="order-item" v-for="(item, i) in gnOrderList" :key="i"  v-if="item.xingcheng.length" @click="showOrderInfo(item.OrderID)">
                <div class="flight" >{{item.OrderCode}}<div>{{item.xingcheng[0].StartCity}}-{{item.xingcheng[0].EndCity}}</div><span :class='"state "+item.style'>{{item.OrderState}}</span></div>
              </li>
            </ul>
            <div class="no-order" v-else>
              暂无任何订单，快快来订单开启您的旅行吧！
            </div>
          </div>
          <ul v-show="tab==3" v-if="personList.length" class="person-box">
            <li class="person-item" v-for="(item, i) in personList" :key="i" v-if="item.CjrName">
              <div class="himg"><div><img :src='imguri + "my.png"' alt=""></div></div>
              <div class="person-info">
                <div>{{item.CjrName}} <span v-if="item.Sex">（{{item.Sex=='男'?'先生':'女士'}}）</span></div>
                <span>出生日期：{{checkTime(item.CSRQ)}}</span>
                <span>护照号码：{{item.HZH}}</span>
                <span v-if="item.HZYXQ">护照有效期：{{checkTime(item.HZYXQ)}}</span>
                <span v-if="item.SFZ">证件号码：{{item.SFZ}}</span>
              </div>
            </li>            
          </ul>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <div v-if="showLayer" id="Layer" @click="closeEditLayer" class="layer">
      <div class="editinfo">
        <div class="title">会员信息</div>
        <div class="form">
          <div class="form-box">
            <span>用户名：</span>
            <input type="text" v-model="username" maxlength="20">
          </div>
          <div class="form-box">
            <span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
            <input type="text" v-model="pass" maxlength="20">
          </div>
          <div class="form-box">
            <span>邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
            <input type="email" v-model="email" maxlength="50">
          </div>
        </div>
        <div class="btn" @click="saveInfo">保存</div>
        <div class="btn out" @click="loginOut">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header/BackFlightHeader.vue'
  import Footer from '../components/Footer/Footer.vue'

  export default {
    name: 'My',
    data() {
      return {
        pageTitle: '个人中心',
        tgqLayer: false,
        showTel: false,
        tab: 1,
        showLayer: false,
        username: '',
        jifen: 0,
        jiangjin: 0,
        pass: '',
        email: '',
        tel: '',
        OrderList: [],
        gnOrderList: [],
        personList: [],
        isLoading: true
      }
    },
    components: {
      Header,
      Footer
    },
    methods: {
      selTab: function (val) {
        this.tab = val
      },
      closeEditLayer: function (e) {
        if(e.target.id == 'Layer'){
          this.showLayer = false
        }
      },
      checkTime: function(v){
        let t = v
        if(v.length === 8){
          t = v.substr(0,4) + '/' + v.substr(4,2) + '/' + v.substr(6,2)
        }
        return t
      },
      showOrderInfo: function(id){
        this.$router.push({ path: '/orderinfo', query: { oid: id } })      
      },
      saveInfo: function(){
        this.username = this.utils.clearSpace(this.username)
        this.pass = this.utils.clearSpace(this.pass)
        this.email = this.utils.clearSpace(this.email)
        if(this.username.length<1){
          this.utils.alert(this, '用户名不能为空')
        }else if(this.pass.length<1){
          this.utils.alert(this, '密码不能为空')
        }else if(this.email.length<1){
          this.utils.alert(this, '邮箱不能为空')
        }else if(!this.utils.checkEmail(this.email)){
          this.utils.alert(this, '请输入正确的邮箱地址')
        }else{
          let param = new URLSearchParams();
          param.append("Mobile", this.tel);
          param.append("Password", this.pass);
          param.append("UserName", this.username);
          param.append("emall", this.email);
          this.utils.ajax({
            name: this,
            uri: 'UpdatePasServlet',
            params: param,
            method: 'post',
            success: res => {
              if (res.data == "1") {
                  this.showLayer = false
                  this.utils.alert(this, '保存成功')
              } else {
                  this.utils.alert(this, '保存失败，请刷新重试')
              }
            },
            fail: ()=>{
              this.utils.alert(this, '保存失败，请刷新重试')
            }
          })
        }
      },
      loginOut: function(){
        this.utils.setItem('kxUserID',"")
        this.$router.push({ path: '/'})
      }
    },
    created: function() {
    },
    beforeMount(){
      var _this=this;
      var userID=this.utils.getItem("kxUserID");
      if(userID && userID != "null"){
        let param = new URLSearchParams();
        param.append("userID", userID);
        //获取用户信息
        this.utils.ajax({
          name: this,
          uri: 'SendUserInfoServlet',
          method: 'post',
          params: param,
          success: res=>{
            if(res.status === 200){
              _this.username = res.data.UserName
              _this.tel = res.data.Mobile
              _this.jifen = res.data.jifen
              _this.jiangjin = res.data.jiangjin
              _this.pass = res.data.Password
              _this.email = res.data.emall
              //获取订单列表
              _this.utils.ajax({
                name: _this,
                uri: 'OrderInfoServlet',
                params: {
                  params: {
                    Mobile: res.data.Mobile
                  }
                },
                success: res=>{
                  _this.isLoading = false
                  if(res.status === 200 && res.data.length){
                    let orders = res.data.sort(function(x,y){
                      return x.OrderID-y.OrderID
                    }).reverse(); 
                    let len = orders.length
                    let gj = []
                    let gn = []
                    for(let i in orders){
                      if(orders[i].OrderState == '取消订单'){
                        orders[i].OrderState = '已取消'
                        orders[i].State = 2
                        orders[i].style = 'cancel'
                      }else if(orders[i].OrderState == '处理中'){
                        orders[i].State = 0
                        orders[i].style = 'wait'
                      }else if(orders[i].OrderState == '候补中'){
                        orders[i].State = 0
                        orders[i].style = ''
                      }else if(orders[i].OrderState == '等待付款'){
                        orders[i].State = 0
                        orders[i].style = ''
                      }else{
                        orders[i].OrderState = '已完成'
                        orders[i].State = 1
                        orders[i].style = ''
                      }
                      if(orders[i].type == '国外'){
                        gj.push(orders[i])
                      }else{
                        gn.push(orders[i])
                      }
                    }
                    _this.OrderList = gj
                    _this.gnOrderList = gn
                  }
                }
              })
            }
          }
        })
        //获取常用乘机人
        this.utils.ajax({
            name: this,
            uri: 'SendUserInfoServlet',
            method: 'post',
            params: param,
            success: res=>{
                if(res.status === 200){
                    this.utils.ajax({
                        name: this,
                        uri: 'SendUserInfoServlet',
                        params: {
                            params: {
                                Mobile: res.data.Mobile
                            }
                        },
                        success: regs=>{
                            if(regs.status === 200){
                                _this.personList = regs.data
                            }
                        }
                    })
                }
            }
        })
      }else{        
        this.$router.push({ path: '/'})
      }
    }
  }

</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
  .my-box{
    background: url($imguri + 'my-bg.png') no-repeat top center #efefef;
    background-size: 100% auto;
    .my-head-box{
      position: relative;
      text-align: center;
      padding: .2rem 1rem;
      .set{
        position: absolute;
        right: 1rem;
        top: 0;
        img{
          width: .3rem;
          height: .3rem;
        }
      }
      .head{
        position: relative;
        width: 1.28rem;
        height: 1.28rem;
        margin: 0 auto;
        border-radius: 1.28rem;
        background: url($imguri + "head.png") no-repeat center #dcdcdc;
        background-size: 1.28rem 1.28rem;
      }
      .head:after{
        content: "VIP";
        position: absolute;
        top: 1rem;
        right: -.2rem;
        background-color: #f7a461;
        color: #fff;
        display: block;
        width: .7rem;
        height: .3rem;
        line-height: .32rem;
        text-align: center;
        border-radius: .3rem;
      }
      .info{
        text-align: center;
        color: #fff;
        font-size: .32rem;
        padding-top: .2rem;
        height: .6rem;
        line-height: .4rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .name{
          max-width: 3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .tel{
          background: url($imguri + 'tel.png') no-repeat left center;
          background-size: auto 90%;
          padding-left: .32rem;
          font-size: .28rem;
          line-height: .42rem;
          margin-left: .2rem;
        }
      }
    }
    .my-info-box{
      padding: 0 .1rem;
      .info{
        background-color: #fff;
        width: 100%;
        border-radius: .1rem;
        padding: .2rem .4rem;
        box-sizing: border-box;
        .item{
          height: 1rem;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          display: flex;
          div{
            width: 50%;
            box-sizing: border-box;
            span{
              display: block;
              text-align: center;
              font-size: .26rem;
              color: #000;
              overflow: hidden;
              padding: 0 .2rem;
              box-sizing: border-box;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:first-child{
              font-size: .24rem;
              color: #999;
              line-height: .6rem;
              letter-spacing: .02rem;
            }
          }
          div:first-child{
            border-right: .02rem solid #eee;
          }
        }
        .item:first-child{
          border-bottom: .02rem solid #eee;
        }
      }
      .order-person-box{
        margin-top: .1rem;
        border-radius: .1rem;
        min-height: 6rem;
        overflow: hidden;
        .tab{
          display: flex;
          justify-content: space-around;
          background-color: #fff;
          height: .8rem;
          line-height: .8rem;
          color: #000;
          span{
            padding: 0 .1rem;
            box-sizing: border-box;
            text-align: center;
            font-size: .28rem;
          }
          .cur{
            color: #f00;
            border-bottom: .02rem solid #f00;
          }
        }
        .list-box{
          margin-top: .1rem;
          padding-bottom: .1rem;
          box-sizing: border-box;
          .order-box{
            .order-list{
              background-color: #fff;
              .order-item{
                height: 1rem;
                background-image: url($imguri + "air-order.png");
                background-repeat: no-repeat;
                background-size: .4rem .4rem;
                background-position: .3rem .3rem;
                border-bottom: .02rem solid #efefef;
                padding: .2rem 0;
                box-sizing: border-box;
                .flight{
                  margin-left: 1rem;
                  border-left: .02rem solid #fcc;
                  height: .6rem;
                  line-height: .6rem;
                  padding: 0 .4rem 0 .2rem;
                  box-sizing: border-box;
                  font-size: .28rem;
                  color: #666;
                  display: flex;
                  div{
                    margin-left: .2rem;
                    width: 3.2rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .state{
                    position: absolute;
                    right: .4rem;
                  }
                  .wait{
                    color: #f00;
                  }
                  .wait:after{
                    content:"...";
                    position: absolute;
                    color: #f00;
                  }
                  .cancel{
                    color: #ff6a00;
                  }
                }
              }
              .cur{
                background-color: #fef6f6;
              }
            }
          }
          .no-order{
            width: 6.2rem;
            margin: .6rem auto 0 auto;
            border: .02rem dashed #ccc;
            border-radius: .1rem;
            text-align: center;
            padding: .6rem 0;
            font-size: .28rem;
            color: #999;
          }
          .person-box{
            background-color: #fff;
            padding: 0 .3rem;
            .person-item{
              padding: .2rem 0;
              border-bottom: .02rem solid #efefef;
              box-sizing: border-box;
              display: flex;
              .himg{
                position: relative;
                width: 1rem;
                div{
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  margin-top: -.4rem;
                  margin-left: -.4rem;
                  width: .8rem;
                  height: .8rem;
                  border-radius: .8rem;
                  text-align: center;
                  justify-content: center;
                  background: linear-gradient(#FFE59B, #F79B62);
                  img{
                    margin-top: .15rem;
                    height: .5rem;
                  }
                }
              }
              .person-info{
                width: 6.1rem;
                display: flex;
                flex-wrap: wrap;
                font-size: .28rem;
                color: #999;
                line-height: .42rem;
                padding-left: .3rem;
                box-sizing: border-box;
                div{
                  width: 100%;
                  color: #333;
                  line-height: .5rem;
                  span{
                    color: #999;
                  }
                }
                span{
                  margin-right: .3rem;
                }
              }
            }
          }
        }
      }
    }
    .editinfo{
      position: absolute;
      left: 50%;
      top: 50%;
      width: 6.4rem;
      height: 6.8rem;
      margin-top: -3.4rem;
      margin-left: -3.2rem;
      background-color: #fff;
      border-radius: .2rem;
      padding: .2rem .4rem;
      box-sizing: border-box;
      .title{
        text-align: center;
        font-size: .32rem;
        color: #000;
        font-weight: bold;
      }
      .form{
        padding: .2rem 0;
        box-sizing: border-box;
        .form-box{
          border: .02rem solid #ccc;
          border-radius: .06rem;
          height: .8rem;
          margin-top: .3rem;
          display: flex;
          box-sizing: border-box;
          overflow: hidden;
          span{
            width: 1.4rem;
            line-height: .8rem;
            text-align: right;
            font-size: .28rem;
          }
          input{
            width: 4.2rem;
            border: 0;
            box-sizing: border-box;
            font-size: .28rem;
            outline: none;
          }
        }
      }
      .btn{
        background-color: #f00000;
        text-align: center;
        height: .8rem;
        line-height: .8rem;
        color: #fff;
        font-size: .3rem;
        border-radius: .06rem;
        margin-top: .3rem;
      }
      .btn:active{
        background-color: #b00000;
      }
      .out{
        background-color: #ccc;        
      }
      .out:active{
        background-color: #999;        
      }
    }
  }
</style>
