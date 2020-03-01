<template>
  <div id="Index" class="index-box">
    <Header isTel="true"></Header>
    <div class="index-body">
      <div class="jipiao">
        <ul class="tab">
          <li :class="tab==0?'cur':''" @click="tabType(0)">国际机票</li>
          <li :class="tab==1?'cur':''" @click="tabType(1)">国内机票</li>
        </ul>
        <div class="book-change-org">
          <div class="book-btn cur" data-type="2">中国大陆始发</div>
          <div class="book-btn" data-type="1">境外始发</div>
        </div>
        <ul class="flight-tab">
          <li :class="tab==0?'cur':''" @click="tabType(0)">单程</li>
          <li :class="tab==1?'cur':''" @click="tabType(1)">往返</li>
          <li :class="tab==2?'cur':''" @click="tabType(2)">定制行程</li>
        </ul>
        <div v-if="tab==0 || tab==1" class="hangban">
          <div class="hb-long" @click="showStartCity">
            <span>出发城市</span>
            <span class="txt"><span v-if="startCityShort">{{startCityValue}}({{startCityShort}})</span></span>
          </div>
          <div class="hb-long" @click="showEndCity">
            <span>到达城市</span>
            <span class="txt"><span v-if="endCityShort">{{endCityValue}}({{endCityShort}})</span></span>
          </div>
          <div class="hb-middle" @click="showStartDate">
            <span>{{startTime}}</span>
          </div>
          <div v-if="tab==1" class="hb-middle" @click="showEndDate">
            <span>{{endTime}}</span>
          </div>
          <div @click="findFlight" class="btn">查询航班</div>
        </div> 
        <div v-else class="dingzhi">
          <div>亲！请写下您的行程，剩下的交给我们来办</div>
          <div class="dingzhi-form-textarea">
            <textarea class="txt" v-model="content" placeholder="如果可以，请尽量详细描述，以便我们能更好的为您量身设计行程。" maxlength="200" ></textarea>
          </div>
          <div class="dingzhi-form" v-if="!isLogin">
            <div>
              <div class="dingzhi-form-name">请填写您的手机号码</div>
              <input type="tel" class="txt" v-model="tel" @blur="changePhone" maxlength="11">
            </div>
            <div v-if="!isVip">
              <div class="dingzhi-form-name">请填写您的姓名</div>
              <input type="text" class="txt" v-model="name" maxlength="20">
            </div>
            <div v-if="!isVip">
              <div class="dingzhi-form-name">请填写您的邮箱</div>
              <input type="email" class="txt"  v-model="email" maxlength="50">
            </div>
            <div>
              <div class="dingzhi-form-name">{{passName}}</div>
              <input type="text" class="txt"  v-model="pass" maxlength="20">
            </div>
          </div>
          <div class="forget" v-if="isVip"><span @click="forgetPassword">忘记密码？</span></div>
          <div class="btn" @click="customTrip">提交</div>
        </div>
      </div>
      <div class="more-discount">
        <img src="../assets/images/m-kx_15.png" alt="">
      </div>
      <div class="more-discount">
        <img src="../assets/images/m-kx_18.png" alt="">
      </div>
      <div class="more-discount">
        <img src="../assets/images/m-kx_56.png" alt="">
      </div>
      <div class="vipEquity">
        <img src="../assets/images/air_hyqy.png" alt="">
        <div class="layerbg">
          <span :class="userID?'sp-order':''" @click="gotoMy">我的订单</span>
          <span>我的积分 <label v-if="userID">+{{jifen}}</label></span>
          <span>我的可用奖金 <label v-if="userID">￥{{jiangjin}}</label></span>
        </div>
      </div>
    </div>
    <Service></Service>
    <Footer></Footer>
    <CityList cityTitle="选择出发城市" :cityList="startCityList" :cityShow="visibleStartCity" v-on:close="visibleStartCity=false" v-on:chooseCity='selStartCity'></CityList>
    <CityList cityTitle="选择到达城市" :cityList="endCityList" :cityShow="visibleEndCity" v-on:close="visibleEndCity=false" v-on:chooseCity='selEndCity'></CityList>
    <DatePicker title="选择出发时间" :dateShow="startDateShow" :endDate="startEndTime" v-on:chooseDate="startConfirm" v-on:close="startCancel"></DatePicker>
    <DatePicker title="选择到达时间" :dateShow="endDateShow" :startDate="startTime" :endDate="startEndTime" v-on:chooseDate="endConfirm" v-on:close="endCancel"></DatePicker>
  </div>
</template>

<script>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  import Footer from '../components/Footer/Footer.vue'
  import Header from '../components/Header/Header.vue'
  import Service from '../components/Footer/ServiceNew.vue'
  import CityList from '../components/Public/CityList.vue'
  import DatePicker from '../components/Public/DatePicker.vue'

  export default {
    name: 'Index',
    data() {
      return {
        tab : 0,
        startDateShow: false,
        endDateShow: false,
        startTime: '',
        endTime: '',
        endStartTime: '',
        startEndTime: '',
        cityList: [],
        startCityList: [],
        endCityList: [],
        tehuiList: [],
        num: 2,
        visibleStartCity: false,
        visibleEndCity: false,
        startCity: '',
        startCityValue: '',
        startCityShort: '',
        endCity: '',
        endCityValue: '',
        endCityShort: '',
        jiangjin: '',
        jifen: '',
        //定制
        tel: '',
        name: '',
        email: '',
        pass: '',
        content: '',
        isVip: false,
        passName: '请设置您的订单查询密码',
        userID: '',
        isLogin: false
      }
    },
    components: {
      Header,
      Footer,
      Service,
      CityList,
      DatePicker
    },
    methods: {
      tabType: function(t) {
        this.tab = t
      },
      findFlight: function () {
        if (this.startCityShort === "") {
            this.utils.alert(this, '请选择出发城市')
        }else if (this.endCityShort === "") {
            this.utils.alert(this, '请选择到达城市')
        }else if (this.startTime === "出发时间") {
            this.utils.alert(this, '请选择出发时间')
        } else if (this.tab === 1 && this.endTime === "返回时间") {
            this.utils.alert(this, '请选择到达时间')
        } else {
            this.utils.setItem("scode", this.startCityShort);
            this.utils.setItem("ecode", this.endCityShort);
            this.utils.setItem("stime", this.startTime);
            this.utils.setItem("etime", this.endTime);
            this.utils.setItem("type", this.tab === 1);
            this.utils.setItem("scity", this.startCity);
            this.utils.setItem("ecity", this.endCity);
            this.utils.setItem("sflight", this.startCityValue);
            this.utils.setItem("eflight", this.endCityValue);
            this.$router.push({
              path: '/flightlist'
            })
        }
      },
      customTrip: function () {
        let that = this
        if(this.tel === ''){
            this.utils.alert(this, '请输入您的手机号码')
        }else if(!this.utils.checkTel(this.tel)){
            this.utils.alert(this, '请输入正确的手机号码')
        }else if(!this.isVip && this.name === ''){
            this.utils.alert(this, '请输入您的姓名')
        }else if(!this.isVip && this.email === ''){
            this.utils.alert(this, '请输入您的邮箱')
        }else if(this.pass === ''){
            if(this.isVip){
              this.utils.alert(this, '请输入登录密码')
            }else{
              this.utils.alert(this, '请设置订单查询密码')
            }
        }else if(this.content === ''){
            this.utils.alert(this, '请输入您的行程规划')
        }else {
          this.Indicator.open()          
          let param = new URLSearchParams();
          param.append("Mobile", this.tel);
          param.append("userID", this.userID);
          this.utils.ajax({
            method: 'post',
            name: this,
            uri: 'AdminLunhuan',
            params: param,
            success: res=>{
              if(res.status === 200 && res.data){
                let CLNAME = res.data;
                let OrderCode = this.randomNum(0, 9);

                this.utils.ajax({
                  uri: "ZdyOrderServlet",
                  name: this,
                  params: {
                    params: {
                        "xingmingxingming": this.name,
                        "phone": this.tel,
                        "emall": this.email,
                        "mima": this.pass,
                        "xinxi": this.content,
                        "OrderCode": OrderCode,
                        "CLNAME": CLNAME,
                        "userID": this.userID
                    }
                  },success: regs=> {
                    this.Indicator.close()      
                    if (regs.data == "-1") {
                        that.utils.alert(this, "您的手机或密码输入错误，请输入正确的信息")
                    } else if (regs.data == "0") {
                        that.utils.alert(this, "提交失败，请刷新重试，或联系管理员")
                    } else {
                        that.utils.alert(this, "提交成功").then(()=>{
                          that.$router.push({ path: '/my' })
                        })
                        that.utils.setItem("kxUserID", regs.data)
                    }
                  },fail:()=>{
                    this.Indicator.close()      
                    that.utils.alert(this, '网络连接失败')
                  }
                })
              }else{
                this.Indicator.close()      
                that.utils.alert(this, '网络连接失败')
              }
            },fail: ()=>{
              this.Indicator.close()      
              this.utils.alert(this, '网络连接失败')
            }
          })
        }
      },
      changePhone: function() {
        this.passName = '请设置您的订单查询密码'
        if(this.tel === ''){
          this.utils.alert(this, '请输入您的手机号码')
        }else if(!this.utils.checkTel(this.tel)){
          this.utils.alert(this, '请输入正确的手机号码')
        }else {
          let param = new URLSearchParams();
          param.append("Mobile", this.tel);
          this.utils.ajax({
            method: 'post',
            name: this,
            uri: 'FindLoginServlet',
            params: param,
            success: res=>{
              if(res.status === 200 && res.data == 1){
                this.isVip = true
                this.passName = '登录密码'
              }else{
                this.isVip = false
              }
            },fail: ()=>{
              this.utils.alert(this, '网络连接失败')
            }
          })
        }
      },
      startConfirm: function(val){
        this.startTime = this.utils.dateFormat(val, "yyyy-MM-dd")
        this.endStartTime = this.utils.getAfterNDate(val, 1, 'd')
        this.startDateShow = false
        if(this.endTime && this.utils.dateTab(this.startTime, this.endTime)){
          this.endTime = '返回时间'
        }
      },
      startCancel: function(){
        this.startDateShow = false
      },
      endConfirm: function(val){
        this.endTime = this.utils.dateFormat(val, "yyyy-MM-dd")
        this.startEndTime = this.utils.getAfterNDate(val, -1, 'd')
        this.endDateShow = false
      },
      endCancel: function(){
        this.endDateShow = false
      },
      showStartCity: function(){
        if(this.startCityList.length){
          this.visibleStartCity = true
        }else{
          this.utils.alert(this, '城市加载中...')
        }
      },
      showEndCity: function(){
        if(this.endCityList.length){
          this.visibleEndCity = true
        }else{
          this.utils.alert(this, '城市加载中...')
        }
      },
      selStartCity: function(val){
        this.startCity = val.city
        this.startCityValue = val.Portname
        this.startCityShort = val.Display
        this.visibleStartCity = false
      },
      selEndCity: function(val){
        this.endCity = val.city
        this.endCityValue = val.Portname
        this.endCityShort = val.Display
        this.visibleEndCity = false
      },
      DateMinus(sDate, now) {　　
        var sdate = new Date(sDate.replace(/-/g, "/"));
        var now = 　new Date(now.replace(/-/g, "/"));
        var days = sdate.getTime() - now.getTime();　　
        var day = parseInt(days / (1000 * 60 * 60 * 24));　　
        return day;
      },
      ArrSort(arr) {
        for (var j = 0; j < arr.length - 1; j++) {
          for (var i = 0; i < arr.length - 1 - j; i++) {
            if (parseInt(arr[i].TicketPrice) > parseInt(arr[i + 1].TicketPrice)) {
              var temp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = temp;
            }
          }
        }
      },
      loadMore: function(){
        if(this.num < this.tehuiList.length){
          this.num+=2
        }
      },
      replaceChar(text){
        return text.replace(/-/g,'/')
      },
      randomNum(min, max) {
        let _text = ''
        for(let i=0; i<6; i++){
          _text += Math.floor(min + Math.random() * (max - min))
        }
        return _text
      },
      selFlight(item){
        this.utils.setItem("scode", item.StartCode);
        this.utils.setItem("ecode", item.EndCode);
        this.utils.setItem("stime", item.DataS);
        this.utils.setItem("etime", item.DataE);
        this.utils.setItem("type", item.Type === '往返');
        this.utils.setItem("scity", item.sCity);
        this.utils.setItem("ecity", item.eCity);
        this.utils.setItem("sflight", item.sportName);
        this.utils.setItem("eflight", item.eportName);
        this.$router.push({path: '/flightlist'})
      },
      gotoMy(){
        let userID=this.utils.getItem("kxUserID");
        if(userID && userID != "null"){
          this.$router.push({
            path: '/my'
          })
        }
      },
      showStartDate(){
        this.startEndTime = this.utils.dateFormat(this.utils.getAfterNDate((new Date()), 1, 'y'), 'yyyy-MM-dd')
        this.startDateShow = true
      },
      showEndDate(){
        if(this.startTime == '' || this.startTime == '出发时间'){
          this.utils.alert(this, '请先选择出发时间')
        }else{          
          this.startEndTime = this.utils.dateFormat(this.utils.getAfterNDate(this.startTime, 1, 'y'), 'yyyy-MM-dd')
          this.endDateShow = true
        }
      },
      forgetPassword: function (){
        if(this.tel.length < 1){
          this.utils.alert(this, '请输入手机号码')
        }else if (this.utils.checkTel(this.tel)) {
            this.Indicator.open();
            var param = new URLSearchParams();
            param.append("phone", this.tel);
            this.utils.ajax({
              name: this,
              uri: 'Wangjimima',
              method: 'post',
              params: param,
              success: res=> {
                this.Indicator.close();
                let data = res.data
                if (data == "-1") {
                    this.utils.alert(this, "您还不是凯行网的会员，请先注册")
                } else if (data == "0") {
                    this.utils.alert(this, "短信发送失败，请联系服务人员")
                } else if (data == "1") {
                    this.utils.alert(this, "您的密码已经发送到您的手机，请注意查收")
                }
              },
              fail: ()=>{
                this.Indicator.close();
                this.utils.alert(this, "网络连接失败，请刷新重试")
              }
            })
        } else {
            this.utils.alert(this, "请输入正确的手机号")
        }
      }
    },
    created() {
      let scode = this.utils.getItem("scode") || 'PEK'
      let ecode = this.utils.getItem("ecode") || 'LAX'
      let stime = this.utils.getItem("stime") || this.utils.dateFormat(this.utils.getAfterNDate(1,'d'),'yyyy-MM-dd')
      let etime = this.utils.getItem("etime") || this.utils.dateFormat(this.utils.getAfterNDate(2,'d'),'yyyy-MM-dd')
      let type = this.utils.getItem("type") || ''
      let scity = this.utils.getItem("scity") || '北京'
      let ecity = this.utils.getItem("ecity") || '洛杉矶  (加利福尼亚州) '
      let sflight = this.utils.getItem("sflight") || '北京首都机场'
      let eflight = this.utils.getItem("eflight") || '洛杉矶国际机场'
      this.startCityShort = scode
      this.endCityShort = ecode
      this.startTime = stime
      this.endTime = etime
      this.tab = 0
      if(type == true || type == 'true'){
        this.tab = 1
      }
      this.startCity = scity
      this.endCity = ecity
      this.startCityValue = sflight
      this.endCityValue = eflight

      this.userID = this.utils.getItem("kxUserID") || ''
      getCityList(this)
      //getAirTehui(this)
     
    },
    beforeMount(){
        let _this=this;
        let userID=this.utils.getItem("kxUserID");
        if(userID && userID != "null"){
            let param = new URLSearchParams();
            param.append("userID", userID);
            this.utils.ajax({
              name: this,
              uri: 'SendUserInfoServlet',
              method: 'post',
              params: param,
              success: res=>{
                if(res.status === 200){
                  _this.jiangjin = res.data.jiangjin
                  _this.jifen = res.data.jifen
                  _this.tel = res.data.Mobile
                  _this.pass = res.data.Password
                }
              }
            })

            this.isLogin = true
            this.isVip = true
        }
    }
  }
  //获取城市列表
  function getCityList(vue){
    vue.utils.ajax({
      name: vue,
      uri: 'CityinternationalServlet',
      success: res=>{
        if(res.status === 200){
          let scity = [], ecity = [];
          for(let i in res.data){
            if(res.data[i].Pinyin.trim().length>0){
              if(res.data[i].type === "2"){
                scity.push(res.data[i])
              }else{
                ecity.push(res.data[i])
              }
            }
          }
          getStartCityList(vue, scity)
          getEndCityList(vue, ecity)
        }
      }
    })
  }
  //获取出发城市
  function getStartCityList(vue, data){
    let sCity = data.sort(function(x,y){
      return x.Pinyin.trim()>y.Pinyin.trim()?1:-1
    })
    let sArr = [];
    let m = 0;
    for(let i = 65; i < 91; i++ ){
      sArr.push({
        index : String.fromCharCode(i),
        items : []
      })
    }
    for(let c in sCity){
      let g = sCity[c].Pinyin.trim().substr(0,1).toLocaleUpperCase()
      if(c != 0 && g != sArr[m].index && m<25){
        m++
      }
      sArr[m].items.push(sCity[c])
    }
    vue.startCityList = sArr
  }
  //获取到达城市
  function getEndCityList(vue, data){
    let eCity = data.sort(function(x,y){
      //return x.Pinyin.trim().substr(0,1).charCodeAt()-y.Pinyin.trim().substr(0,1).charCodeAt()
      return x.Pinyin.trim()>y.Pinyin.trim()?1:-1
    })
    let eArr = [];
    let m = 0;
    for(let i = 65; i < 91; i++ ){
      eArr.push({
        index : String.fromCharCode(i),
        items : []
      })
    }
    let len = eCity.length
    for(let a=0; a < len; a++){
      let g = eCity[a].Pinyin.trim().substr(0,1).toLocaleUpperCase()
      if(a && g != eArr[m].index && m<25){
        m++;
      }
      eArr[m].items.push(eCity[a])
    }
    vue.endCityList = eArr
  }
  //获取特惠机票
  function getAirTehui(vue){
    var _this = vue;
    vue.utils.ajax({
      name: vue,
      uri: 'ListServletJS',
      success: res=>{
        if(res.status === 200){
          var data = res.data;
          for (var i = 0; i < data.length; i++) {
              var DataSM = parseInt(data[i].DataS.split("-")[1]);
              var DataEM = parseInt(data[i].DataE.split("-")[1]);
              var eDay = _this.DateMinus(data[i].DataE, data[i].DataS);
              data[i].eDay=eDay;
              if (data[i].Info.length != 0 || data[i].Info != undefined) {
                  for (var k = 0; k < data[i].Info.length; k++) {
                      for (var j = 0; j < data[i].Info[k].Info1.length; j++) {
                          if (data[i].Type == "往返") {
                              if (parseInt(data[i].Info[k].Info1[j].StartM) > DataSM || parseInt(data[i].Info[k].Info1[j].EndM) < DataEM) {
                                  data[i].Info[k].Info1.splice(j, 1);
                                  j = 0;
                                  k = 0;
                                  i = 0;
                              }
                          } else {
                              if (parseInt(data[i].Info[k].Info1[j].StartM) > DataSM || parseInt(data[i].Info[k].Info1[j].EndM) < DataSM) {
                                  data[i].Info[k].Info1.splice(j, 1);
                                  j = 0;
                                  k = 0;
                                  i = 0;
                              }
                          }

                          if (data[i].Type == "往返" && parseInt(data[i].Info[k].Info1[j].WFTS) < parseInt(eDay)) {
                              data[i].Info[k].Info1.splice(j, 1);
                              j = 0;
                              k = 0;
                              i = 0;
                          }
                      }
                      if (data[i].Info[k].Info1.length == 0) {
                          data[i].Info.splice(k, 1);
                          j = 0;
                          k = 0;
                          i = 0;
                      }
                  }
              }

          }
          for (var i = 0; i < data.length; i++) {
              for (var k = 0; k < data[i].Info.length; k++) {
                  _this.ArrSort(data[i].Info[k].Info1);
              }
          }
          for (var i = 0; i < data.length; i++) {
              for (var k = 0; k < data[i].Info.length; k++) {
                  data[i].Info[k].TicketPrice = data[i].Info[k].Info1[0].TicketPrice;
                  delete data[i].Info[k].Info1;
              }
          }
          for (var i = 0; i < data.length; i++) {
              _this.ArrSort(data[i].Info);
          }
          for (var i = 0; i < data.length; i++) {
              data[i].TicketPrice = data[i].Info[0].TicketPrice;
              data[i].HKGS = data[i].Info[0].HKGS;
              delete data[i].Info;

          }
          var aircomArr = [];
          var sCode = [];
          var eCode = [];
          for (var i = 0; i < data.length; i++) {
              aircomArr.push(data[i].HKGS);
              sCode.push(data[i].StartCode);
              eCode.push(data[i].EndCode);
          }
          var oldData = data;
          var aircomArr = JSON.stringify(aircomArr)
          var sCode = JSON.stringify(sCode)
          var eCode = JSON.stringify(eCode)
          let param = new URLSearchParams();
          param.append("aircomArr", aircomArr);
          param.append("sCode", sCode);
          param.append("eCode", eCode);
          getTehuiList(vue, param, oldData)
          //vue.tehuiList = res.data
        }
      }
    })
  }
  function getTehuiList(vue, params, oldData){
    vue.utils.ajax({
      name: vue,
      uri: 'ListServletJS',
      method: 'post',
      params: params,
      success: res=>{
        if(res.status === 200){
          var data = res.data;
          for (var i = 0; i < oldData.length; i++) {
              oldData[i].aircomName = data[0][i].aircomName;
              oldData[i].aircomP = data[0][i].Picture;
              oldData[i].sCity = data[1][i];
              oldData[i].eCity = data[2][i];
              oldData[i].sportName = data[3][i];
              oldData[i].eportName = data[4][i];
              oldData[i].id=i;
          }
          vue.tehuiList = oldData
        }
      }
    })
  }

</script>

<style lang="scss">
  .index-box{
    padding: 0;
    background-color: #f4f4f4;
    .index-body{
      padding: .2rem .14rem;
      font-size: .28rem;
      background: url('../assets/images/m-kx-bg_03.png') no-repeat top center;
      background-size: 100% auto;
      background-color: #f4f4f4;
      .jipiao{
        background-color: #fff;
        padding: 0 .3rem .2rem .3rem;
        color: #333;
        border-radius: .1rem;
        margin-top: 1.3rem;
        box-shadow: 0rem 0rem .1rem 0rem #aaa;
        .tab{
          display: flex;
          justify-content: space-around;
          border-bottom: .02rem solid #ddd;   
          li{
            border: .02rem solid #fff;
            text-align: center;
            height: .8rem;
            line-height: .8rem;
            box-sizing: border-box;
            font-size: .32rem;
          }
          .cur{
            color: #f00000;
            position: relative;   
            border-bottom: .04rem solid #f00000;         
          }
        }
        .book-change-org {
          height: .88rem;
          line-height: .88rem;
          display: flex;
          padding-left: .08rem;
          font-size: .28rem;
          .book-btn {
            position: relative;
            margin-right: .3rem;
            padding-left: .4rem;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none
          }
          .book-btn::before {
            content: '';
            position: absolute;
            left: 0;
            top: .315rem;
            width: .25rem;
            height: .25rem;
            border: .02rem solid #888;
            box-sizing: border-box;
            border-radius: .25rem;
          }
          .cur::before {
            border: .02rem solid #de1721
          }
          .cur::after {
            content: '';
            position: absolute;
            left: .07rem;
            top: .38rem;
            width: .12rem;
            height: .12rem;
            background-color: #de1721;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-radius: .2rem
          }
        }
        .flight-tab{
          height: .66rem;
          display: flex;
          justify-content: space-between;
          li{
            width: 2.04rem;
            height: .54rem;
            line-height: .54rem;
            border-radius: .08rem;
            text-align: center;
            background-color: #f2f2f2;
            position: relative;
          }
          .cur{
            background-color: #de1721;
            color: #fff;
          }
          .cur::after{
            content: '';
            border-width: .12rem .12rem 0 .12rem;
            border-style: solid;
            border-color: #e01114 transparent #e01114 transparent;
            position: absolute;
            left: .94rem;
            top: .53rem;
          }
        }
        .hangban{
          display: flex;
          flex-wrap: wrap;
          margin-top: .1rem;
          justify-content: space-between;
          padding-bottom: .5rem;
          .hb-long{
            width: 100%;
            height: .9rem;
            background-color: #ffffff;
            line-height: .92rem;
            margin-top: .2rem;
            padding: 0 .2rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            border: .02rem solid #ccc;
            .hb-long:first-child{
              width: .56rem;
            }
            .txt{
              position: relative;
              margin: .2rem 0;
              height: .5rem;
              line-height: .52rem;
              width: 4.96rem;
              border-left: 1px solid #ccc;
              padding-left: .2rem;
              box-sizing: border-box;
            }
            .txt::after{
              position: absolute;
              top: 0;
              right: 0;
              display: block;
              content: ' ';
              width: .5rem;
              height: .5rem;
              background: url('../assets/images/search.png') no-repeat center #888888;
              background-size: .33rem .3rem;
            }
          }
          .hb-middle{
            position: relative;
            width: 3.2rem;
            height: .9rem;
            background-color: #ffffff;
            line-height: .9rem;
            margin-top: .2rem;
            padding: 0 .2rem;
            box-sizing: border-box;
            border: .02rem solid #ccc;
          }
          .hb-middle::after{
            position: absolute;
            top: .2rem;
            right: .2rem;
            display: block;
            content: ' ';
            width: .5rem;
            height: .5rem;
            background: url('../assets/images/date.png') no-repeat center;
            background-size: .4rem .4rem;
            background-color: #888888;
          }
          .btn{
            display: block;
            margin: .5rem auto 0 auto;
            width: 5.96rem;
            height: .88rem;
            line-height: .88rem;
            text-align: center;
            background-color: #f00000;
            border-radius: 1rem;
            font-size: .32rem;
            color: #fff;
          }
        }
        .dingzhi{
          color: #333;
          margin-top: .3rem;
          padding-bottom: .5rem;
          .dingzhi-form-textarea{
            display: flex;
            justify-content: space-between;
            div{
              width: 3.25rem;
              text-align: left;
              height: .6rem;
              line-height: .6rem;
              margin-top: .2rem;
              font-size: .26rem;
            }
            textarea{
              margin-top: .2rem;
              resize: none;
              text-indent: .5rem;
              width: 100%;
              height: 2.8rem;
              padding: .4rem .3rem;
            }
            textarea::placeholder{
              color: #b4b4b4;
            }
          }
          .dingzhi-form{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: .2rem;
            .dingzhi-form-name{
              line-height: .6rem;
              height: .6rem;
            }
            input{
              width: 3.25rem;
              text-align: left;
              height: .9rem;
              padding: .2rem;
              box-sizing: border-box;
            }
          }
          .txt{
            outline: none;
            border: 0;
            background-color: #fff;
            color: #333;
            box-sizing: border-box;
            border: .02rem solid #ddd;
          }
          .btn{
            display: block;
            margin: .5rem auto 0 auto;
            width: 4.64rem;
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            color: #fff;
            background-color: #f00000;
            border-radius: .1rem;
          }
          .forget{
            text-align: right;
            color: #999;
            line-height: .4rem;
            font-size: .24rem;
          }
        }
        .btn:active{
          background-color: #C50000;
        }
      }
      .more-discount{
        margin-top: .3rem;
        img{
          display: block;
          width: 100%;
        }
      }
      .vipEquity{
        margin: 0;
        margin-top: .4rem;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
        .layerbg{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1.2rem;
          color: #eee;
          background-color: rgba(0,0,0,.1);
          padding: .1rem 0 0 .2rem;
          box-sizing: border-box;
          font-size: .24rem;
          display: flex;
          span{
            padding-right: .5rem;
            margin-right: .5rem;
            box-sizing: border-box;
            display: block;
            height: .4rem;
            label{
              margin: 0;
              padding: 0;
            }
          }
          span:last-child{
            margin: 0;
            padding: 0;
          }
          .sp-order{
            background: url('../assets/images/yjt.png') no-repeat right center;
            background-size: .24rem;
          }
        }
      }

    }
  }
  @keyframes td{
    0% { top: 0 }
    5% { top: .1rem }
    100%{ top: 0 }
  }
</style>
