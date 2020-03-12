<template>
  <div id="FlightList" class="flightlist-box">
    <div class="flist-tlist">
      <div class="flist-head">
        <Header class="flight-header" :pageTitle="pageTitle"></Header>
        <div class="flist-body-pd">
          <div class="flist-search">
            <label>{{flightType}}</label>
            <span>{{utils.dateFormat(startDate, 'MM月dd日')}}</span>
          </div>
        </div>
      </div>
      <template v-if="!isLoading">
      <div class="flist-body" v-if="!notFind">
        <ul class="flist-list">
          <li class="flist-item" v-for="(titem, index) in startList" :key="index">
            <div v-for="(item, i) in titem" :key="i" :class='i!=0?"itemboxs":"itembox"'>
              <div class="itembox-padding" v-if="i == 0">
                <div class="lab">
                  <div class="labs">
                    <img v-if="item.airinfo" :src="item.airinfo.Picture" alt="">
                    <span>{{item.AirCode}}</span>
                    <label @click="showTgqLayer(item.piaojia.beizhu)">退改签规定</label>
                    <label>税金￥{{flightType == '往返'?item.jipiao.WFS:item.jipiao.DCS}}</label>
                  </div>
                  <div class="btnprice">
                    <span>￥<label>{{item.piaojia.TicketPrice}}</label></span>
                    <a @click="selFlight(item.AirID, index, item.STime, item.AirCode, item.index)">{{btnname}}</a>
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
                <template v-if="item.otherFlight.length">
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
              <div class="itembox-padding" v-if="i > 0 && index==othernum" @click="selFlight(item.AirID, index, item.STime, item.AirCode, item.index)">
                <div class="info">
                  <div class="info-go">
                    <div class="time">{{item.STime}}</div>
                    <div class="name">{{item.SPortName}}</div>
                  </div>
                  <div class="change other">{{item.AirCode}}</div>
                  <div class="info-to">
                    <div class="time">{{item.ETime}}</div>
                    <div class="name">{{item.EPortName}}</div>
                  </div>
                </div>
                <template v-if="item.otherFlight.length">
                  <div v-for="(flight, j) in item.otherFlight" :key="j" class="info info-change">
                    <div class="change-name"><span>中转{{j+1}}次</span></div>
                    <div class="info-go">
                      <div class="time">{{flight.STime}}</div>
                      <div class="name">{{flight.SPortName}}</div>
                    </div>
                    <div class="change other">{{flight.AirCode}}</div>
                    <div class="info-to">
                      <div class="time">{{flight.ETime}}</div>
                      <div class="name">{{flight.EPortName}}</div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <template v-if="titem.length>1">
              <div v-if="index == othernum" class="moreUp" @click="othernum=-1">
                <div></div>
              </div>
              <div v-else class="moreDown" @click="othernum=index"></div>
            </template>
          </li>
        </ul>
        <Footer></Footer>
      </div>
      <div class="flight-nofind" v-else>
        <div class="nofind-content">
          <div class="content">很遗憾，未查到相关航班！</div>
          <div class="red">·您可以更改搜索条件：比如北京出发</div>
          <div class="red">·或者致电客服 : <a href="tel:400-722-7722">400-722-7722</a> 寻求帮助</div>
          <div class="dizhi">
            <div class="tit">亲，或者写下您的行程信息，剩下的交给我们来办</div>
            <div>
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
              <div class="forget" v-if="isVip">
                <span class="tip">系统检测已是会员</span>
                <span @click="forgetPassword">忘记密码？</span>
              </div>
              <div class="btn" @click="customTrip">提交</div>
            </div>
          </div>
        </div>        
      </div>
      </template>
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
        btnname: '预定',
        tgqLayer: false,
        notFind: false,
        flightType: '',
        startCity: '',
        endCity: '',
        startDate: '',
        endDate: '',
        startList: [],
        backList: [],
        flightList: [],
        isLoading: true,
        beizhu: '',
        othernum: 0,
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
      selFlight: function(id, i, stime, scode, index){
        let s = [];
        s.push(this.startList[i])
        this.utils.setItem('startFlight', JSON.stringify(s))
        this.utils.setItem('sairtime', stime)
        this.utils.setItem('saircode', scode)
        this.utils.setItem('sairid', id)
        if(this.flightType === '往返'){
          let e = [];
          e.push(this.backList[index])
          this.utils.setItem('backFlight', JSON.stringify(e))
          this.$router.push({ path: '/returnflight' })
        }else{
          this.$router.push({ path: '/flightinfo' })
        }
      },
      customTrip: function () {
        let that = this
        let isCheck = true
        if(this.tel === ''){
            this.utils.alert(this, '请输入您的手机号码')
            isCheck = false
        }else if(!this.utils.checkTel(this.tel)){
            this.utils.alert(this, '请输入正确的手机号码')
            isCheck = false
        }else if(!this.isVip && this.name === ''){
            this.utils.alert(this, '请输入您的姓名')
            isCheck = false
        }else if(!this.isVip && this.email === ''){
            this.utils.alert(this, '请输入您的邮箱')
            isCheck = false
        }else if(!this.isVip && this.email === '' && !this.utils.checkEmail(this.email)){
            this.utils.alert(this, '邮箱格式不正确')
            isCheck = false
        }else if(this.pass === ''){
            if(this.isVip){
                this.utils.alert(this, '请输入登录密码')
            isCheck = false
            }else{
                this.utils.alert(this, '请设置订单查询密码')
            isCheck = false
            }
        }else if(this.content === ''){
            this.utils.alert(this, '请输入您的行程规划')
            isCheck = false
        }else{
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
                    that.Indicator.close()
                    if (regs.data == "-1") {
                        that.utils.alert(this, "您的手机或密码输入错误，请输入正确的信息")
                    } else if (regs.data == "0") {
                        that.utils.alert(this, "提交失败，请刷新重试，或联系管理员")
                    } else {
                        that.utils.setItem("kxUserID", regs.data)
                        that.utils.alert(this, "提交成功").then(()=>{
                          that.$router.push({ path: '/my' })
                        })
                    }
                  },fail:()=>{
                    that.Indicator.close()
                    that.utils.alert(that, '网络连接失败')
                  }
                })
              }
            },fail: e=>{              
              console.log(e)
              this.Indicator.close()
              this.utils.alert(this, '网络连接失败')
            }
          })
        }
      },
      changePhone: function() {
        let that = this
        this.passName = '请设置您的订单查询密码'
        if(this.tel === ''){
          this.utils.alert(this, '请输入您的手机号码')
          that.isVip = false
        }else if(!this.utils.checkTel(this.tel)){
          this.utils.alert(this, '请输入正确的手机号码')
          that.isVip = false
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
                that.isVip = true
                that.passName = '登录密码'
              }else{
                that.isVip = false
              }
            },fail: ()=>{
              this.utils.alert(this, '网络连接失败')
            }
          })
        }
      },
      randomNum(min, max) {
        let _text = ''
        for(let i=0; i<6; i++){
          _text += Math.floor(min + Math.random() * (max - min))
        }
        return _text
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
      },
    },
    created: function() {
        let scode = this.utils.getItem("scode")
        let ecode = this.utils.getItem("ecode")
        let stime = this.utils.getItem("stime")
        let etime = this.utils.getItem("etime")
        let types = this.utils.getItem("type")
        let scity = this.utils.getItem("scity")
        let ecity = this.utils.getItem("ecity")
        let eDay = this.utils.getItem("eDay")
        this.startCity = scity;
        this.endCity = ecity;
        this.startDate = stime;
        this.pageTitle = '去：'+ scity + '-' + ecity
        if(types == true || types == 'true'){
          this.endDate = etime
          this.flightType = '往返'
          this.btnname = '选定'
        }else{
          this.flightType = '单程'
        }
        let param = {
          params: {
            'scode': scode,
            'ecode': ecode,
            'type': this.flightType
          }
        }
        this.isLoading = true
        
        this.userID=this.utils.getItem("kxUserID") || '';
        if(this.userID && this.userID != "null"){
          this.isLogin = true
          getUserInfo(this, this.userID)
        }
        getFightList(this, param)
    }
  }

  //获取航班线路
  function getFightList(vue, param){
      vue.Indicator.open()
      vue.utils.ajax({
        uri: 'SelectPriceServlet',
        params: param,
        name: vue,
        success: res => {
          try{
            if(res.status === 200 && res.data.hangxian.length > 0){
              let data = res.data
              console.log(JSON.parse(JSON.stringify(data)))
              let slist = []; //去程列表
              let elist = []; //返程列表
              let clist = []; //航空公司列表
              let alist = []; //机型列表
              let month = parseInt(vue.startDate.split('-')[1])
              let len = data.hangxian.length
              //单程
              for(let i=0, j=0; i<len; i++,j++){
                let item = data.hangxian[i]
                if(item.length>0){
                  let sm = vue.startDate.split('-')[1]
                  let piaojia = getPiaojia(data.piaojia[i], parseInt(sm))
                  if(piaojia){
                    if (!clist.includes(item[0].AirCode.substr(0,2))){
                      clist.push(item[0].AirCode.substr(0,2))
                    }
                    for(let m=0; m<item.length; m++){
                      item[m].otherFlight = data.zhuanji[i][m]
                      item[m].piaojia = piaojia
                      item[m].jipiao = data.jipiao[i]
                      item[m].index = j
                      if (!alist.includes(item[m].Jixing)){
                        alist.push(item[m].Jixing)
                      }
                      for (let h=0; h<data.zhuanji[i][m].length; h++) {
                        let zjf = data.zhuanji[i][m][h]
                        if (zjf && zjf.Jixing && !alist.includes(zjf.Jixing)) {
                          alist.push(zjf.Jixing)
                        }
                        if (zjf && zjf.AirCode && !clist.includes(zjf.AirCode.substr(0,2))) {
                          clist.push(zjf.AirCode.substr(0,2))
                        }
                      }
                    }
                    slist.push(item)
                  } else if (vue.flightType === '往返') {
                    slist.push([])
                  }
                } else if (vue.flightType === '往返') {
                  slist.push([])
                }
              }

              //返程
              if(vue.flightType === '往返'){
                len = data.hangxianS.length
                for(let i=0; i<len; i++){
                  let item = data.hangxianS[i]
                  if(item.length>0){                  
                    let em = vue.endDate.split('-')[1]
                    let dnum = DateDiff(vue.startDate, vue.endDate)
                    let piaojia = getPiaojia(data.piaojia[i], em, dnum)
                    if(piaojia){
                      if (!clist.includes(item[0].AirCode.substr(0,2))){
                        clist.push(item[0].AirCode.substr(0,2))
                      }
                      for(let l=0; l<item.length; l++){
                        item[l].otherFlight = data.zhuanjiS[i][l]
                        item[l].piaojia = piaojia
                        item[l].jipiao = data.jipiao[i]
                        if (!alist.includes(item[l].Jixing)){
                          alist.push(item[l].Jixing)
                        }
                        for (let h=0; h<data.zhuanjiS[i][l].length; h++) {
                          let zjf = data.zhuanjiS[i][l][h]
                          if (zjf && zjf.Jixing && !alist.includes(zjf.Jixing)) {
                            alist.push(zjf.Jixing)
                          }
                          if (zjf && zjf.AirCode && !clist.includes(zjf.AirCode.substr(0,2))) {
                            clist.push(zjf.AirCode.substr(0,2))
                          }
                        }
                      }
                      elist.push(item)
                    } else {
                      elist.push([])
                    }
                  } else {
                    elist.push([])
                  }
                }
              }
              console.log(clist)
              console.log(alist)
              vue.utils.ajax({
                uri: 'FindAirComJixingServlet',
                params: {
                  params: {
                    aircom: JSON.stringify(clist),
                    jixing: JSON.stringify(alist)
                  }
                },
                name: vue,
                success: regs => {
                  console.log(JSON.parse(JSON.stringify(regs.data)))
                  if(regs.status === 200 && regs.data.airInfo.length > 0){
                    len = slist.length
                    let dels = []
                    for (let i=0; i<len; i++){
                      let sitem = slist[i]
                      if (sitem.length > 0) {
                        for(let m=0; m<sitem.length; m++){
                          let _ix = clist.indexOf(sitem[m].AirCode.substr(0,2))
                          if (_ix > -1) {
                            sitem[m].airinfo = regs.data.aircomInfo[_ix]
                          }
                          for (let t=0; t<sitem[m].otherFlight.length; t++) {
                            let _of = sitem[m].otherFlight[t]
                            let _ixof = clist.indexOf(_of.AirCode.substr(0,2))
                            if (_ixof > -1) {
                              _of.airinfo = regs.data.aircomInfo[_ixof]
                            }
                          }
                        }
                      } else {
                        dels.push(i)
                      }
                      if(vue.flightType === '往返'){
                        let eitem = elist[i]
                        if (eitem && eitem.length > 0) {
                          for(let n=0; n<eitem.length; n++){
                            let _ixe = clist.indexOf(eitem[n].AirCode.substr(0,2))
                            if (_ixe > -1) {
                              eitem[n].airinfo = regs.data.aircomInfo[_ixe]
                            }
                            for (let t=0; t<eitem[n].otherFlight.length; t++) {
                              let _of = eitem[n].otherFlight[t]
                              let _ixof = clist.indexOf(_of.AirCode.substr(0,2))
                              if (_ixof > -1) {
                                _of.airinfo = regs.data.aircomInfo[_ixof]
                              }
                            }
                          }
                        } else if (!dels.includes(i)){
                          dels.push(i)
                        }
                      }
                    }

                    for(let z=dels.length-1;z>=0;z--) {
                      slist.splice(dels[z],1)
                    }

                    let m = 0;
                    for(let i=0; i<slist.length; i++){
                      for(let j in slist[i]){
                        let _ix = alist.indexOf(slist[i][j].Jixing)
                        if (_ix > -1) {
                          slist[i][j].airtype = regs.data.airInfo[_ix]
                        }
                        for (let t=0; t<slist[i][j].otherFlight.length; t++) {
                          let _of = slist[i][j].otherFlight[t]
                          let _ixof = alist.indexOf(_of.Jixing)
                          if (_ixof > -1) {
                            _of.airtype = regs.data.airInfo[_ixof]
                          }
                        }

                        //slist[i][j].airtype = regs.data.airInfo[m++]
                      }
                    }
                    vue.startList = compare(slist)
                    if(vue.flightType === '往返'){
                      for(let i=0; i<elist.length; i++){
                        for(let j in elist[i]){
                          let _ix = alist.indexOf(elist[i][j].Jixing)
                          if (_ix > -1) {
                            elist[i][j].airtype = regs.data.airInfo[_ix]
                          }
                          for (let t=0; t<elist[i][j].otherFlight.length; t++) {
                            let _of = elist[i][j].otherFlight[t]
                            let _ixof = alist.indexOf(_of.Jixing)
                            if (_ixof > -1) {
                              _of.airtype = regs.data.airInfo[_ixof]
                            }
                          }
                          //elist[i][j].airtype = regs.data.airInfo[m++]
                        }
                      }
                      vue.backList = elist
                      console.log(elist)
                    }
                    if (slist.length > 0) {
                      vue.notFind = false
                    } else {
                      vue.notFind = true
                    }
                  }else{                  
                    vue.isLoading = false
                    vue.notFind = true
                  }
                },
                fail: ()=>{
                  vue.isLoading = false
                  vue.notFind = true
                }
              })
            }else{
              vue.notFind = true
            }
            vue.isLoading = false
            vue.Indicator.close()
          }catch (e) {
            vue.notFind = true
            vue.isLoading = false
            vue.Indicator.close()
          }
        },
        fail: ()=>{
          vue.Indicator.close()
          vue.isLoading = false
          vue.notFind = true
          vue.utils.alert(vue, '网络连接失败，请刷新重试')
        }
      })
  }

  //获取票价
  function getPiaojia(pj, m, num){
    let list = []
    let dt = {}
    let len = pj.length
    if(len > 0){
      list = pj.filter(function(x){
        return parseInt(x.startM) <= parseInt(m) && parseInt(m) <= parseInt(x.endM)
      })
      list.sort(function(x,y){
        return parseInt(x.TicketPrice) - parseInt(y.TicketPrice)
      })
      dt = list[0]
    }
    return dt
  }

  //获取天数
  function DateDiff(d1, d2) {
    var day = 24 * 60 * 60 * 1000;
    try {
        var dateArr = d1.split("-");
        var checkDate = new Date();
        checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
        var checkTime = checkDate.getTime();

        var dateArr2 = d2.split("-");
        var checkDate2 = new Date();
        checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
        var checkTime2 = checkDate2.getTime();

        var cha = Math.ceil((checkTime - checkTime2) / day);
        return cha;
    } catch (e) {
        return 0;
    }
  }

  //航班排序
  function compare(dlist){
    console.log(dlist)
    let zf = [];
    let zz = [];
    zf = dlist.filter(function(i){
      return i && i[0].otherFlight.length<1
    })
    zz = dlist.filter(function(i){
      return i && i[0].otherFlight.length>0 && i[0].piaojia
    })
    zz.sort(function(x,y){
      return parseInt(x[0].piaojia.TicketPrice) - parseInt(y[0].piaojia.TicketPrice)
    })
    return zf.concat(zz)
  }

  //获取用户信息
  function getUserInfo(vue, uid){
      let userID = uid
      if(userID && userID != "null"){
        let param = new URLSearchParams();
        param.append("userID", userID);
        //获取用户信息
        vue.utils.ajax({
          name: vue,
          uri: 'SendUserInfoServlet',
          method: 'post',
          params: param,
          success: res=>{
            if(res.status === 200){
              vue.name = res.data.UserName
              vue.tel = res.data.Mobile
              vue.email = res.data.emall
              vue.pass = res.data.Password
            }
          }
        })
      }
  }
</script>

<style lang="scss">
  .flightlist-box{
    min-height: 100%;
    height: 100%;
    background: linear-gradient(#E70000 1rem, #EFEFEF 5rem);
    overflow: hidden;
    font-size: .24rem;
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
            background-color: rgba(255,255,255,.42);
            display: flex;
            label{
              margin: .1rem 0 0 .12rem;
              border: .02rem solid #bfbfbf;
              background-color: #eeeeee;
              height: .42rem;
              width: .72rem;
              line-height: .42rem;
              text-align: center;
              color: #f00000;
              border-radius: .1rem;
              box-sizing: border-box;
              font-size: .28rem;
            }
            span{
              line-height: .62rem;
              margin-left: .1rem;
              color: #444;
              font-size: .24rem;
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
              background-color: #fff;
              border-radius: .1rem;
              box-sizing: border-box;
            }
            .itemboxs{
              border-radius: .1rem;              
              background-color: #e4e4e4;
              margin-bottom: .1rem;
              box-sizing: border-box;
            }
            .itembox-padding{
              padding: .1rem .1rem .2rem .2rem;
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
              .other{
                color: #888;
                font-size: .2rem;
                line-height: .8rem;
                background: url('../assets/images/flight.png') no-repeat center;
                background-size: 1.1rem;
                background-position-y: .6rem;
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
      .flight-nofind{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 1.6rem;
        .nofind-content{
          background-color: #fff;
          padding: 0 .4rem .4rem .4rem;
          height: 100%;
          overflow-y: scroll;
        }
        .content{
          text-align: center;
          font-size: .32rem;
          color: #999;
          padding: .4rem 0;
        }
        .red{
          color: #f00000;
          font-size: .28rem;
          line-height: .5rem;
        }
        .dizhi{
          padding: .2rem 0;
          box-sizing: border-box;
          .tit{
            font-size: .28rem;
          }
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
              font-size: .24rem;
            }
            textarea::placeholder{
              color: #b4b4b4;
              font-size: .24rem;
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
              font-size: .28rem;
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
            border: .02rem solid #ccc;
            color: #333;
            box-sizing: border-box;
          }
          .btn{
            display: block;
            margin: .5rem auto 0 auto;
            width: 4.64rem;
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            background-color: #f00000;
            border-radius: .1rem;
            color: #fff;
            font-size: .32rem;
          }
          .btn:active{
            background-color: #C50000;
          }
          .forget{
            display: flex;
            justify-content: space-between;
            color: #999;
            line-height: .4rem;
            font-size: .24rem;
            .tip{
              color: #de1721;
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
