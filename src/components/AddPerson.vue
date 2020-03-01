<template>
    <div id="AddPerson" class="addperson-box">
        <Header class="header" :pageTitle="pageTitle"></Header>
        <div class="person-form">
            <div class="notice">请确保填写信息准备无误，乘客姓名必须是拼音或英文</div>
            <div class="form-box" v-if="PersonList.length">
                <ul class="text-box" v-for="(item, index) in PersonList.slice(0,1)" :key="index">
                    <li class="text-item">
                        <span class="text-item-key">姓名：</span>
                        <input type="text" @blur="checkName" v-model="item.CjrName" placeholder="与乘机人证件一致" maxlength="20">
                        <div class="use" v-if="userID && list[0].values.length>0" @click="showChengjiren">常用乘机人</div>
                    </li>
                    <li class="text-item">
                        <span class="text-item-key middle">出生年月：</span>
                        <input type="text" readonly @click="selBirth(0, item.type)" v-model="item.CSRQ" placeholder="请选择出生日期" maxlength="20">
                    </li>
                    <li class="text-item">
                        <span class="text-item-key middle">护照号码：</span>
                        <input type="text" @blur="checkPassport" v-model="item.HZH" placeholder="请填写护照号码" maxlength="30">
                    </li>
                    <li class="text-item">
                        <span class="text-item-key lager">护照有效期：</span>
                        <input type="text" readonly @click="huzhaoShow=true;selIndex=0" v-model="item.HZYXQ" placeholder="请选择护照有效期" maxlength="20">
                    </li>
                    <li class="text-item">
                        <span class="text-item-key">性别：</span>
                        <mt-radio v-model="item.Sex" :options="['男', '女']"></mt-radio>
                    </li>
                </ul>
            </div>
            <div class="new-person">
                <div class="chengjiren" v-if="PersonList.length>1">
                    <ul class="text-box" v-for="(item, i) in PersonList.slice(1,PersonList.length)" :key="i">
                        <li class="text-item">
                            <span class="text-item-key">姓名：</span>
                            <input type="text" placeholder="与乘机人证件一致" maxlength="20" @blur="checkName" v-model="item.CjrName">
                            <div class="del" @click="del(i+1)">—</div>
                        </li>
                        <li class="text-item">
                            <span class="text-item-key middle">出生年月：</span>
                            <input type="text" placeholder="请选择出生日期" maxlength="20" readonly @click="selBirth(i+1, item.type)" v-model="item.CSRQ">
                        </li>
                        <li class="text-item">
                            <span class="text-item-key middle">护照号码：</span>
                            <input type="text" placeholder="请填写护照号码" maxlength="30" @blur="checkPassport" v-model="item.HZH">
                        </li>
                        <li class="text-item">
                            <span class="text-item-key lager">护照有效期：</span>
                            <input type="text" placeholder="请选择护照有效期" maxlength="20" readonly @click="huzhaoShow=true;selIndex=i+1" v-model="item.HZYXQ" >
                        </li>
                        <li class="text-item">
                            <span class="text-item-key">性别：</span>
                            <mt-radio v-model="item.Sex" :options="['男', '女']"></mt-radio>
                        </li>
                    </ul>
                </div>

                <div class="add"><span>+新增乘机人</span><label @click="addChengren">成人</label><label @click="addErtong">儿童</label></div>

            </div>
        </div>
        <div class="amount">
            <span>￥{{amountPrice}}</span>
            <a @click="submit">提 交</a>
        </div>
        <Footer class="footer"></Footer>
        <DateTime :dateShow="birthShow" :startTime="this.utils.getAfterNDate(-100, 'y')" :endTime="new Date()" v-on:confirm="birthConfirm" v-on:cancel="selIndex=-1;birthShow=false"></DateTime>
        <DateTime :dateShow="huzhaoShow" :startTime="new Date()" :endTime="this.utils.getAfterNDate(100, 'y')" v-on:confirm="huzhaoConfirm" v-on:cancel="selIndex=-1;huzhaoShow=false"></DateTime>
        <PickerList :dataList='dataList' :isShow="showPerson" :keys="listKey" v-on:selValue="checkUser" v-on:cancelList="showPerson=false"></PickerList>
    </div>
</template>

<script>
import Header from '@/components/Header/BackFlightHeader.vue'
import Footer from '@/components/Footer/Footer.vue'
import PickerList from '@/components/Public/PickerList.vue'
import DateTime from '../components/Public/DateTime.vue'

import { setInterval, setTimeout } from 'timers';
export default {
    name: 'AddPerson',
    data() {
        return {
            pageTitle: '填写乘机人',
            tgqLayer: false,
            dataList: [{values:[]}],
            showPerson: false,
            PersonList: [],
            pList: [],
            userID: 0,
            username: '',
            pass: '',
            email: '',
            tel: '',
            cname: '',
            amountPrice: 0,
            airPrice: 0,
            airTax: 0,
            linkname: '',
            birthday: '',
            passport: '',
            passporttime: '',
            sex: '',
            birthShow: false,
            huzhaoShow: false,
            selIndex: -1,
            listKey: '',
            list: [{values:[]}],
            isSubmitIng: false,
            person: {
                CjrName: '',//联系人
                Sex: '',//性别
                HZH: '',//护照号码
                HZYXQ: '',//护照有效期
                CSRQ: '',//出生日期
                SFZ: '',//身份证
                type: '1'//类型1成人 0儿童
            },
            orderID : '',
            flightID: '',
            startInfo: {},
            backInfo: {}

        }
    },
    components: {
        Header,
        Footer,
        PickerList,
        DateTime
    },
    methods : {
        showChengjiren () {
            this.showPerson = true
            this.listKey = 'CjrName'
            this.dataList = this.list
        },
        checkUser (val) {
            this.showPerson = false
            if(val.length<1){
                return false
            }
            let i = this.PersonList.findIndex(function(e){
                return e.CjrName == val[0].CjrName
            })
            if(i<0){
                let p = this.PersonList[0]
                let myDate = this.utils.dateFormat('yyyy')
                if(val[0].CSRQ.length>5){
                    let age = parseInt(myDate) - parseInt(val[0].CSRQ.substr(0,4))
                    if (age > 12) {
                        val[0].type = '1'
                    }else{
                        val[0].type = '0'
                    }
                }else{
                    val[0].type = '1'
                }
                if(this.PersonList.length<2 && p.CjrName == '' && p.Sex == '' && p.HZH == '' && p.HZYXQ == '' && p.CSRQ == ''){
                    this.PersonList[0] = val[0]
                }else{
                    this.PersonList.push(val[0])
                }
                countAmount(this)      
            }
        },
        checkName (e) {
            let v = e.target.value
            if(v.length < 0 || v.length > 20 || !this.utils.englishName(v)){
                this.utils.alert(this, '姓名必须是拼音或英文')
            }
        },
        checkPassport (e) {
            let v = e.target.value
            if (v.length > 50 || this.utils.isEn(v) || !this.utils.isNumberEn(v)) {
                this.utils.alert(this, '格式不正确')
            } else if(v.length<1){
                this.utils.alert(this, '请输入护照号码')
            }
        },
        birthConfirm(v){
            let val = this.utils.dateFormat(v, 'yyyy-MM-dd').split('-')
            if(this.PersonList[this.selIndex].type === '0'){
                let myDate = this.utils.dateFormat('yyyy')
                let age = parseInt(myDate) - parseInt(val[0])
                if (age > 12) {
                    this.utils.alert(this, '该乘客年龄超出，请重新选择')
                    this.birthShow = false
                    return false
                }
            }
            this.PersonList[this.selIndex].CSRQ = this.utils.dateFormat(v, "yyyyMMdd")
            this.birthShow = false
            this.selIndex = -1
        },
        huzhaoConfirm(v){
            this.PersonList[this.selIndex].HZYXQ = this.utils.dateFormat(v, "yyyy-MM-dd")
            this.huzhaoShow = false
            this.selIndex = -1
        },
        selBirth(i, type) {
            this.birthShow = true;
            this.selIndex = i
        },
        addChengren () {
            this.person.type = '1'
            this.PersonList.push(JSON.parse(JSON.stringify(this.person)))
            countAmount(this)   
        },
        addErtong () {
            this.person.type = '0'
            this.PersonList.push(JSON.parse(JSON.stringify(this.person)))
            countAmount(this)
        },
        del (i) {
            this.PersonList.splice(i,1)
            countAmount(this)
        },
        submit () {
            let p = this.PersonList            
            let ischeck = true

            for(let i in p){
                this.pList[i] = {}
                this.pList[i].PName = this.utils.clearSpace(p[i].CjrName)
                this.pList[i].PCode = ""
                this.pList[i].PHZ = this.utils.clearSpace(p[i].HZH)
                this.pList[i].PBD = this.utils.clearSpace(p[i].CSRQ)
                this.pList[i].PSEX = this.utils.clearSpace(p[i].Sex)
                this.pList[i].PHZYXQ = this.utils.clearSpace(p[i].HZYXQ)
                this.pList[i].FlightID = 0
                let myDate = this.utils.dateFormat('yyyy')
                let age = 0
                if(p[i].CSRQ.length > 1){
                    age = parseInt(myDate) - parseInt(p[i].CSRQ.substr(0,4))
                }
                if(p[i].CjrName.length < 1 || p[i].CjrName.length > 20 || !this.utils.englishName(p[i].CjrName)){
                    this.utils.alert(this, '第' + (parseInt(i)+1) + '位乘机人姓名必须是拼音或英文')
                    ischeck = false
                    break
                }else if(p[i].HZH.length < 1){
                    this.utils.alert(this, '请输入第' + (parseInt(i)+1) + '位乘机人的护照号码')
                    ischeck = false
                    break
                }else if(p[i].HZH.length > 50 || this.utils.isEn(p[i].HZH) || !this.utils.isNumberEn(p[i].HZH)){
                    this.utils.alert(this, '第' + (parseInt(i)+1) + '位乘机人护照号码格式不正确')
                    ischeck = false
                    break
                }else if(p[i].CSRQ.length < 1){
                    this.utils.alert(this, '请选择第' + (parseInt(i)+1) + '位乘机人的出生日期')
                    ischeck = false
                    break
                }else if(p[i].type == '0' && age > 12){
                    this.utils.alert(this, '第' + (parseInt(i)+1) + '位乘机人年龄超出，请重新选择出生日期')
                    ischeck = false
                    break
                }else if(p[i].Sex.length < 1){
                    this.utils.alert(this, '请选择第' + (parseInt(i)+1) + '位乘机人的性别')
                    ischeck = false
                    break
                }
            }
            if(ischeck && !this.isSubmitIng){
                let that = this
                this.Indicator.open('提交中...');

                let param = new URLSearchParams();
                param.append("Mobile", this.tel);
                param.append("userID", this.userID);
                this.utils.ajax({
                    name: this,
                    uri: 'AdminLunhuan',
                    method: 'post',
                    params: param,
                    success: res=>{
                        console.log(res)
                        if(res.status === 200){
                            that.cname = res.data
                        }
                    },
                    fail: function(){
                        that.Indicator.close()
                        that.utils.alert(that, '网络连接失败')
                    }
                }).then(a => {
                    let OrderCode = randomNum(0, 9)
                    let OrderPrice = (parseInt(that.utils.getItem('orderprice')) + parseInt(that.utils.getItem('ordertax'))) * that.pList.length
                    let AirType = '单程'
                    let mdd = that.utils.getItem("ecode")
                    let types = that.utils.getItem("type")
                    if(types == true || types == 'true'){
                        AirType = '往返'
                    }

                    let params = new URLSearchParams();
                    params.append("OrderCode", OrderCode);
                    params.append("OrderPrice", that.amountPrice);
                    params.append("OrderType", 2);
                    params.append("OrderState", '处理中');
                    params.append("FKState", 0);
                    params.append("AirType", AirType);
                    params.append("CLNAME", that.cname);
                    params.append("userID", that.userID);
                    params.append("LXR", that.username);
                    params.append("Mobile", that.tel);
                    params.append("pas", that.pass);
                    params.append("LXDH", that.tel);                    
                    params.append("Email", that.emall);
                    if(that.userID){
                        params.append("yidenglu", 'yidenglu');
                    }else{
                        params.append("yidenglu", 'weidenglu');
                    }                    
                    params.append("Contact", that.username);
                    params.append("mdd", mdd);
                    that.utils.ajax({
                        name: that,
                        uri: 'SendAdminServlet',
                        method: 'post',
                        params: params,
                        success: res=>{
                            console.log(res)  
                            if(res.status === 200){
                                that.orderID  = res.data
                            }
                        },
                        fail: function(){
                            that.Indicator.close()
                            that.utils.alert(that, '网络连接失败')
                        }
                    }).then(function(){
                        let tax = parseInt(that.utils.getItem('ordertax'))
                        let flightPrice = OrderPrice-tax
                        let companyCode = that.startInfo.CompanyCode
                        let beizhu = that.startInfo.piaojia.beizhu
                        let flightCode = that.startInfo.AirCode + ' '
                        if(that.startInfo.otherFlight && that.startInfo.otherFlight.length > 0){
                            for(let m in that.startInfo.otherFlight){
                                flightCode += that.startInfo.otherFlight[m].AirCode + ' '
                            }
                        }
                        if(AirType === '往返'){
                            flightCode += that.backInfo.AirCode + ' '
                            if(that.backInfo.otherFlight && that.backInfo.otherFlight.length > 0){
                                for(let n in that.backInfo.otherFlight){
                                    flightCode += that.backInfo.otherFlight[n].AirCode + ' '
                                }
                            }
                        }

                        that.utils.ajax({
                            name: that,
                            uri: 'AddFilghtServlet',
                            method: 'get',
                            params: {
                                params: {
                                    "FlightPrice": that.airPrice,
                                    "Shuijin": that.airTax,
                                    "CompanyName": companyCode,
                                    "FlightCode": flightCode,
                                    "FlightContent": beizhu,
                                    "OrderID": that.orderID
                                }
                            },
                            success: res=>{
                                console.log(res)  
                                if(res.status === 200){
                                    let d = res.data.split("$")
                                    that.flightID  = d[0]
                                }                 
                            },
                            fail: function(){
                                that.Indicator.close()
                                that.utils.alert(that, '网络连接失败')
                            }
                        }).then(function(){
                            let StartDate = []
                            let cityCode1 = []
                            let cityCode2 = []
                            let cityCode3 = []
                            let cityCode4 = []
                            let cityCode5 = []
                            let cityTime1 = []
                            let cityTime2 = []
                            let cityTime3 = []
                            let cityTime4 = []
                            let FlightCode1 = []
                            let jixing = []
                            StartDate.push(that.utils.getItem("stime"))
                            cityCode1.push(that.startInfo.SPortName)
                            cityCode2.push(that.startInfo.EPortName)
                            cityTime1.push(that.startInfo.STime)
                            cityTime2.push(that.startInfo.ETime)
                            FlightCode1.push(that.startInfo.AirCode)
                            jixing.push(that.startInfo.Jixing)

                            let ofl = that.startInfo.otherFlight
                            if(ofl.length){
                                for(var i in ofl){
                                    cityCode1.push(ofl[i].SPortName)
                                    cityCode2.push(ofl[i].EPortName)
                                    cityTime1.push(ofl[i].STime)
                                    cityTime2.push(ofl[i].ETime)
                                    FlightCode1.push(ofl[i].AirCode)
                                    jixing.push(ofl[i].Jixing)
                                    let _d = ofl[i].STime.split('+')
                                    if(_d.length<2){
                                        StartDate.push(that.utils.getItem("stime"))
                                    }else{
                                        let _ad = that.utils.getAfterNDate(that.utils.getItem("stime"), parseInt(_d[1]), 'd')
                                        StartDate.push(that.utils.dateFormat(_ad, 'yyyy-MM-dd'))
                                    }                                    
                                }
                            }
                            if(AirType === '往返'){
                                StartDate.push(that.utils.getItem("etime"))
                                cityCode1.push(that.backInfo.SPortName)
                                cityCode2.push(that.backInfo.EPortName)
                                cityCode4.push(that.startInfo.SPortName)
                                cityCode4.push(that.backInfo.SPortName)
                                cityCode5.push(that.backInfo.SPortName)
                                cityCode5.push(that.startInfo.SPortName)
                                cityTime1.push(that.backInfo.STime)
                                cityTime2.push(that.backInfo.ETime)
                                cityTime4.push(that.utils.getItem("stime"))
                                cityTime4.push(that.utils.getItem("etime"))
                                FlightCode1.push(that.backInfo.AirCode)
                                jixing.push(that.backInfo.Jixing)
                                let bofl = that.backInfo.otherFlight
                                if(bofl.length){
                                    for(var i in bofl){
                                        cityCode1.push(bofl[i].SPortName)
                                        cityCode2.push(bofl[i].EPortName)
                                        cityTime1.push(bofl[i].STime)
                                        cityTime2.push(bofl[i].ETime)
                                        FlightCode1.push(bofl[i].AirCode)
                                        jixing.push(bofl[i].Jixing)
                                        let _d = bofl[i].STime.split('+')
                                        if(_d.length<2){
                                            StartDate.push(that.utils.getItem("etime"))
                                        }else{
                                            let _ad = that.utils.getAfterNDate(that.utils.getItem("etime"), parseInt(_d[1]), 'd')
                                            StartDate.push(that.utils.dateFormat(_ad, 'yyyy-MM-dd'))
                                        }                                    
                                    }
                                }
                            }else{
                                cityCode3.push(that.startInfo.SPortName)
                                cityCode3.push(that.startInfo.EPortName)
                                cityTime3.push(that.utils.getItem("stime"))
                            }

                            let parameters = new URLSearchParams()
                            parameters.append("FlightID", that.flightID);
                            parameters.append("StartDate", JSON.stringify(StartDate))
                            parameters.append("cityCode1", JSON.stringify(cityCode1))
                            parameters.append("cityTime1", JSON.stringify(cityTime1))
                            parameters.append("cityCode2", JSON.stringify(cityCode2))
                            parameters.append("cityCode3", JSON.stringify(cityCode3))
                            parameters.append("cityCode4", JSON.stringify(cityCode4))
                            parameters.append("cityCode5", JSON.stringify(cityCode5))
                            parameters.append("cityTime2", JSON.stringify(cityTime2))
                            parameters.append("cityTime3", JSON.stringify(cityTime3))
                            parameters.append("cityTime4", JSON.stringify(cityTime4))
                            parameters.append("FlightCode1", JSON.stringify(FlightCode1))
                            parameters.append("jixing", JSON.stringify(jixing))
                            parameters.append("chengjiren", JSON.stringify(that.pList))
                            parameters.append("lineType", AirType)
                            that.utils.ajax({
                                name: that,
                                uri: 'AddFilghtServlet',
                                method: 'post',
                                params: parameters,
                                success: res=>{
                                    console.log(res)  
                                    if(res.status === 200){
                                        
                                    }                 
                                    that.Indicator.close()
                                },
                                fail: function(){
                                    that.Indicator.close()
                                    that.utils.alert(that, '网络连接失败')
                                }
                            }).then(function(){
                                let pm = new URLSearchParams()
                                if(that.userID){
                                    pm.append("yidenglu", 'yidenglu');
                                }else{
                                    pm.append("yidenglu", 'weidenglu');
                                }
                                pm.append("userID", that.userID);
                                pm.append("Contact", "");
                                pm.append("Email", "");
                                pm.append("Mobile", "");
                                pm.append("pas", "");
                                pm.append("OrderID", that.orderID);
                                pm.append("XCContent", '');
                                pm.append("chengjiren", JSON.stringify(that.pList));
                                that.utils.ajax({
                                    name: that,
                                    uri: 'AdddetailServlet',
                                    method: 'post',
                                    params: pm,
                                    success: res=>{
                                        console.log(res)  
                                        if(res.status === 200){
                                            that.utils.alert(that, '订单提交成功!').then(action => {
                                                that.$router.push({ path: '/my' })
                                            })
                                        }                 
                                        that.Indicator.close()
                                    },
                                    fail: function(){
                                        that.Indicator.close()
                                        that.utils.alert(that, '网络连接失败')
                                    }
                                })
                            })
                        })
                    })
                })
            }
        }
    },
    created () {
        this.PersonList.push(JSON.parse(JSON.stringify(this.person)))   
        this.airPrice = parseInt(this.utils.getItem('orderprice'))   
        this.airTax = parseInt(this.utils.getItem('ordertax'))
        this.amountPrice = this.airPrice + this.airTax
        this.userID = this.utils.getItem("kxUserID")
        this.startInfo = JSON.parse(this.utils.getItem("startInfo"))
        this.backInfo = JSON.parse(this.utils.getItem("backInfo"))
        console.log(this.startInfo)
        console.log(this.backInfo)

        if(this.userID){
            let param = new URLSearchParams();
            param.append("userID", this.userID);
            let that = this
            this.utils.ajax({
                name: this,
                uri: 'SendUserInfoServlet',
                method: 'post',
                params: param,
                success: res=>{
                    if(res.status === 200){
                        console.log(res)
                        that.tel = res.data.Mobile
                        that.username = res.data.UserName
                        that.email = res.data.emall
                        that.pass = res.data.Password
                        this.utils.ajax({
                            name: this,
                            uri: 'SendUserInfoServlet',
                            params: {
                                params: {
                                    Mobile: that.tel
                                }
                            },
                            success: regs=>{
                                if(regs.status === 200){
                                    console.log(regs)
                                    that.list[0].values = regs.data
                                }
                            }
                        })
                    }
                }
            })
        } else {
            this.tel = this.utils.getItem('lmtel')
            this.username = this.utils.getItem('lmname')
            this.email = this.utils.getItem('lmemail')
            this.pass = this.utils.getItem('lmpass')
        }

        // document.body.style.overflow='hidden';        
        document.addEventListener("touchmove",function(e){e.preventDefault();},false);//禁止页面滑动
    },
}

function randomNum(min, max) {
    let text = ''
    for(let i=0;i<6;i++){
        text += Math.floor(min + Math.random() * (max - min))
    }
    return text
}

function countAmount(vue){
    let p = vue.airPrice
    let t = vue.airTax
    let len = vue.PersonList.length
    let amount = 0
    for(let i in vue.PersonList){
        if(vue.PersonList[i].type == '1'){
            amount += p + t
        }else{
            amount += p*0.75 + t
        }
    }
    vue.amountPrice = amount
}

</script>

<style lang="scss">
    .addperson-box{
        position: relative;
        height: 100%;
        min-height: 12.44rem;
        background-color: #f4f4f4;
        .header{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1;
            background-color: #f00000;
        }
        .person-form{
            padding-top: .9rem;
            padding-bottom: 3.3rem;
            box-sizing: border-box;
            height: 100%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            .notice{
                background: url("../assets/images/notice.png") no-repeat;
                background-size: .32rem .32rem;
                background-position-x: .6rem;
                background-position-y: center;
                background-color: #ffffdb;
                height: .8rem;
                line-height: .8rem;
                padding-left: 1rem;
                color: #6e6e6e;
                font-size: .24rem;
            }
            .form-box{
                background-color: #fff;
                padding: 0 .2rem;
                box-sizing: border-box;
                .text-box{
                    padding: 0;
                }
            }
            .new-person{
                padding: .2rem .1rem;
                .chengjiren{
                    .text-box{
                        margin-bottom: .2rem;
                    }
                }
                .add{
                    line-height: .5rem;
                    display: flex;
                    span{
                        border: .02rem solid #f4f4f4;
                        width: 1.8rem;
                        text-align: center;
                        border-radius: .06rem;
                        font-size: .28rem;
                        color: #777;
                    }
                    label{
                        position: relative;
                        width: .8rem;
                        height: .4rem;
                        text-align: center;
                        line-height: .4rem;
                        margin-top: .05rem;
                        margin-left: .2rem;
                        border: .02rem dotted #f00000;
                        border-radius: .06rem;
                        overflow: hidden;
                        background-color: #f00000;
                        color: #fff;
                        font-size: .24rem;
                    }
                    .cur::after{
                        content: '';
                        position: absolute;
                        top: -.02rem;
                        right: -.02rem;
                        color: #fff;
                        width: 0;
                        height: 0;
                        border-width: .24rem 0 0 .24rem;
                        border-style: solid;
                        border-color: #f00000 transparent transparent transparent;
                    }
                }

            }
        }
        .text-box{
            font-size: .28rem;
            color: #666;
            background-color: #fff;
            padding: 0 .2rem;
            box-sizing: border-box;
            .text-item{
                position: relative;
                height: .8rem;
                line-height: .8rem;
                border-bottom: .02rem dotted #ccc;
                padding: 0 .3rem;
                box-sizing: border-box;
                display: flex;
                overflow: hidden;
                .text-item-key{
                    min-width: 1rem;
                }
                .middle{
                    min-width: 1.5rem;
                }
                .lager{
                    min-width: 1.8rem;
                }
                input{
                    width: 100%;
                    box-sizing: border-box;
                    border: 0;
                    font-size: .28rem;
                }
                input::placeholder{
                    color: #aaa;
                    font-size: .28rem;
                }
                .del{
                    position: absolute;
                    top: .2rem;
                    right: .1rem;
                    width: .4rem;
                    height: .4rem;
                    background-color: #FB9653;
                    color: #fff;
                    border-radius: .4rem;
                    font-size: .24rem;
                    line-height: .4rem;
                    text-align: center;
                }
                .use{
                    position: absolute;
                    top: .2rem;
                    right: .1rem;
                    width: 1.6rem;
                    height: .4rem;
                    background-color: #f00000;
                    color: #fff;
                    border-radius: .08rem;
                    font-size: .24rem;
                    line-height: .4rem;
                    text-align: center;
                }
                .mint-radiolist{
                    display: flex;
                    .mint-radiolist-title{
                        margin: 0;
                    }
                    .mint-cell{
                        width: auto;
                        min-height: auto;
                        .mint-cell-wrapper{
                            height: 100%;
                            padding-left: 0;
                            font-size: .28rem;
                            background-image: none;
                            .mint-radiolist-label{
                                padding-left: 0;
                                .mint-radio-core{
                                    width: .28rem;
                                    height: .28rem;
                                    border: .02rem solid #ccc;
                                }
                                .mint-radio-core::after{
                                    width: .12rem;
                                    height: .12rem;
                                    left: .06rem;
                                    top: .06rem;
                                }
                            }
                        }
                    }
                    .mint-cell:last-child{
                        background-image: none;
                    }
                }
            }
            .text-item:last-child{
                border: 0;
            }
        }
        .amount{
            position: absolute;
            left: 0;
            bottom: 2.4rem;
            width: 100%;
            height: .8rem;
            background-color: #fff;
            padding: 0 .2rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            span{
                color: #f00000;
                font-size: .4rem;
                line-height: .8rem;
            }
            a{
                width: 2rem;
                height: .6rem;
                background-color: #f00000;
                color: #fff;
                font-size: .32rem;
                text-align: center;
                margin-top: .1rem;
                line-height: .6rem;
                border-radius: .1rem;
            }
        }
        .footer{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
        }
    }
</style>
