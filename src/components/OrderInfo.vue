<template>
    <div id="OrderInfo" class="orderinfo-box">
        <div class="userinfo">
            <Header :pageTitle="pageTitle"></Header>
            <div class="user">
                <div class="head"><img :src='orderInfo.touxiang' alt=""></div>
                <div class="link">
                    <div class="name">您的客服专员—{{orderInfo.clname}}</div>
                    <div class="phone"><a :href='"tel:"+orderInfo.GLphone'>{{orderInfo.GLphone}}</a></div>
                </div>
                <div class="ercode">
                    <img :src='orderInfo.erweima' alt="">
                </div>
            </div>
        </div>
        <div class="flightinfo">
            <div class="flight-time">
                <span>预订时间：</span>{{orderInfo.OrderTime}}
            </div>
            <div class="flight-in flight-box" v-if="startFlightList && startFlightList.length">
                <div class="flight-box-info">
                    <span>出发</span>{{startFlightList[0].StartDate}}
                </div>
                <ul class="flight-box-list">
                    <li class="flight-box-item" v-for='(item, i) in startFlightList' :key='i' >
                        <template v-if='i>0'>
                            <div class="change-flight-num">中转{{i}}次</div>
                        </template>
                        <div class="info-go">
                            <div>{{item.qifei.split('/')[1]}}</div>
                            <span>{{item.qifei.split('/')[0]}}</span>
                        </div>
                        <div class="change">{{item.AirCode}}</div>
                        <div class="info-to">
                            <div>{{item.jiangluo.split('/')[1]}}</div>
                            <span>{{item.jiangluo.split('/')[0]}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="flight-out flight-box" v-if="backFlightList && backFlightList.length>1">
                <div class="flight-box-info">
                    <span>返程</span>{{backFlightList[0].StartDate}}
                </div>
                <ul class="flight-box-list">
                    <li class="flight-box-item" v-for='(item, i) in backFlightList' :key='i' >
                        <template v-if='i>0'>
                            <div class="change-flight-num">中转{{i}}次</div>
                        </template>
                        <div class="info-go">
                            <div>{{item.qifei.split('/')[1]}}</div>
                            <span>{{item.qifei.split('/')[0]}}</span>
                        </div>
                        <div class="change">{{item.AirCode}}</div>
                        <div class="info-to">
                            <div>{{item.jiangluo.split('/')[1]}}</div>
                            <span>{{item.jiangluo.split('/')[0]}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="infotitle">
            <div class="title">乘客信息</div>
        </div>
        <div class="person-box">
            <ul class="person-list" v-if="orderInfo.chengke && orderInfo.chengke.length">
                <li class="person-item" v-for="(item, i) in orderInfo.chengke" :key="i">
                    <div class="name">{{item.Pname}}（{{item.PSEX}}）</div>
                    <div class="info">
                        <div>出生日期：{{checkTime(item.PBD)}}</div>
                        <div>护照号码：{{item.PHZ}}</div>
                        <div>护照有效期：{{checkTime(item.PHZYXQ)}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="infotitle">
            <div class="title">限制条件</div>
        </div>
        <div class="limit-box">
            <ul class="limit-list">
                <li class="limit-item" v-if="orderInfo.TGQ" v-html="checkStr(orderInfo.TGQ)">
                    {{checkStr(orderInfo.TGQ)}}
                </li>
            </ul>
            <div class="remarks">
                <div class="remark-text"><textarea name="" id="" class="" cols="30" rows="3" readonly v-model="orderInfo.xccCon"></textarea></div> 
                <div class="name">备注</div>
            </div> 
        </div>        
        <div class="infotitle">
            <div class="title">订单详情</div>
        </div>
        <div class="info-box">
            <div class="info-list">
                <div class="info-item">单人票价：<span>￥{{orderInfo.piaojia}}</span></div>
                <div class="info-item">单人税金：<span>￥{{orderInfo.shuijin}}</span></div>
                <div class="info-item">总计：<span>￥{{orderInfo.zongjia}}</span></div>
            </div>
            <div class="info-list">
                <div class="info-item">订单状态：<span class="red">{{orderInfo.OrderState}}</span></div>
                <div class="info-item">支付状态：<span class="red">{{orderInfo.FKState == '1' ? '已支付' : '未支付'}}</span></div>
            </div>
            <div class="info-list">
                <div class="info-item">机票号码：<span class="red">{{orderInfo.OrderStat || '未确认'}}</span></div>
            </div>
        </div>        
        <div class="infotitle">
            <div class="title">
                付款信息
                <span class="sub-title">(应付金额 ￥{{orderInfo.shifujine}})</span>
                <span class="sub-title other-title" @click="isMadeJiangjin=false">[使用奖金{{orderInfo.shiyongjiangjin}}元]</span>
            </div>
        </div>
        <div class="pay-box">
            <div class="pay-reward" v-if="!isMadeJiangjin">
                <div class="usable-reward">可用奖金：<span>￥{{orderInfo.jiangjin}}</span></div>
                <div class="made-reward" v-if="orderInfo.OrderState != '取消订单' && orderInfo.FKState != '1'">
                    <span>请输入使用奖金金额：</span>
                    <input type="number" v-model="jianjin" maxlength="5">
                    <span>&nbsp;&nbsp;元</span>
                    <span class="btn" @click="checkJianjin">确定</span>
                </div>
            </div>
            <div class="pay-method">
                <div class="title">
                    付款方式：
                    <span class="red">{{orderInfo.FKFS||"未支付"}} <span v-if="orderInfo.FKFS">（实付金额：￥{{orderInfo.shifujine}}）</span></span>
                </div>
                <ul class="method-list">
                    <li class="method-item yhk"><mt-radio class="rd-item" v-model="orderInfo.FKFS" :options="['银行汇款']" align="right"></mt-radio></li>
                    <li class="method-item zfb"><mt-radio class="rd-item" v-model="orderInfo.FKFS" :options="['支付宝']" align="right"></mt-radio></li>
                    <li class="method-item sm"><mt-radio class="rd-item" v-model="orderInfo.FKFS" :options="['上门刷卡']" align="right"></mt-radio></li>
                    <li class="method-item xj"><mt-radio class="rd-item" v-model="orderInfo.FKFS" :options="['现金']" align="right"></mt-radio></li>
                    <li class="method-item wx"><mt-radio class="rd-item" v-model="orderInfo.FKFS" :options="['微信转账']" align="right"></mt-radio></li>
                    <li class="method-item online"><mt-radio class="rd-item" v-model="orderInfo.FKFS" :options="['在线支付']" align="right"></mt-radio></li>
                </ul>
            </div>
        </div>
        <div class="travel-box">
            <div class="btn cur" @click="travelMethod(0)">不需要</div>
            <div class="btn" @click="travelMethod(1)">自取</div>
            <div class="btn" @click="travelMethod(2)">邮寄</div>
            <span class="explain">+行程单发票</span>
        </div>
        <div class="btn-box" v-if="orderInfo.OrderState != '取消订单' && orderInfo.FKState != '1'">
            <div class="btn btn-ok" @click="saveOrder">保存</div>
            <div class="btn btn-cancel" @click="isCancel = true">取消订单</div>
        </div>
        <Footer></Footer>
        <!-- 发票自取 -->
        <div class="layer" v-if="invoiceziqu" @click="invoiceziqu=false">
            <div class="invoice-invite">
                <div class="title">公司地址信息</div>
                <div class="info">
                    <div>取件地址：</div>
                    <div class="red">北京市东城区东直门南大街9号<br/>华普花园C座906</div>
                </div>
                <div class="beizhu">温馨提示：请截图保存</div>
            </div>
        </div>
        <!-- 发票邮寄信息填写 -->
        <div class="layer" v-if="invoiceyouji">
            <div class="invoice-post">
                <div class="title">
                    <span class="red" @click="invoiceyouji=false">取消</span>
                    <span>行程单信息</span>
                    <span class="red" @click="checkInvoice">确定</span>
                </div>
                <ul class="info">
                    <li class="info-item">
                        <span class="name">用户姓名：</span>
                        <input type="text" class="txt" v-model="xingchengdan.name" maxlength="20">
                    </li>        
                    <li class="info-item">
                        <span class="name">手机号码：</span>
                        <input type="tel" class="txt" v-model="xingchengdan.tel" maxlength="11">
                    </li>  
                    <li class="info-item">
                        <span class="name">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编：</span>
                        <input type="tel" class="txt" v-model="xingchengdan.code" maxlength="6">
                    </li>  
                    <li class="info-item">
                        <span class="name">邮寄地址：</span>
                        <textarea class="txt textarea" name="" id="" cols="34" rows="5" v-model="xingchengdan.address" maxlength="200"></textarea>
                    </li>        
                </ul>
            </div>
        </div>
        <!-- 支付宝支付 -->
        <div class="layer" v-if="alipayShow" @click="alipayShow=false">
            <div class="alipay-box">
                <div class="title">订单总金额：￥{{orderInfo.shifujine}}</div>
                <div class="info">
                    <div>支付宝账户名称：北京凯行网航空服务有限公司</div>
                    <div>支付宝账号：<span class="zh">sale@airkx.com</span></div>                    
                </div>
            </div>
        </div>
        <!-- 其它支付 -->
        <div class="layer" v-if="otherPay" @click="otherPay=false">
            <div class="otherpay-box">
                <div class="title">订单总金额：￥{{orderInfo.shifujine}}</div>
                <div class="info">
                    为保证您的资金安全，请添加右上角管理员<br />微信进行安全支付！
                </div>
            </div>
        </div>
        <!-- 银行汇款 -->
        <div class="layer" v-if="bankPay" @click="bankPay=false">
            <div class="bankpay-box">
                <div class="title">订单总金额：￥{{orderInfo.shifujine}}</div>
                <ul class="bank-list">
                    <li class="bank-item">
                        <div class="bank-logo">
                            <img src="../assets/images/bank/bank_bj.png" alt="">
                        </div>
                        <div class="bank-info">
                            开户名称：北京凯行网航空服务有限公司<br/>
                            开户行：北京银行东直门支行 <br/>
                            银行账号：<span class="no">01090377300120109723179</span>
                        </div>
                    </li>
                    <li class="bank-item">
                        <div class="bank-logo">
                            <img src="../assets/images/bank/bank_ny.png" alt="">
                        </div>
                        <div class="bank-info">
                            开户行：中国农业银行东四十条支行<br/>
                            持卡人：赵坤<br/>
                            银行账号：<span class="no">6228 4500 1804 4999 272</span>
                        </div>
                    </li>
                    <li class="bank-item">
                        <div class="bank-logo">
                            <img src="../assets/images/bank/bank_jt.png" alt="">
                        </div>
                        <div class="bank-info">
                            开户行：交通银行北京市分行<br/>
                            持卡人：赵坤<br/>
                            银行账号：<span class="no">6222 6209 1000 4051 755</span>
                        </div>
                    </li>
                    <li class="bank-item">
                        <div class="bank-logo">
                            <img src="../assets/images/bank/bank_pd.png" alt="">
                        </div>
                        <div class="bank-info">
                            开户行：上海浦东发展银行北京雅宝路支行<br/>
                            持卡人：赵坤<br/>
                            银行账号：<span class="no">6217 9206 0416 8745</span>
                        </div>
                    </li>
                    <li class="bank-item">
                        <div class="bank-logo">
                            <img src="../assets/images/bank/bank_zg.png" alt="">
                        </div>
                        <div class="bank-info">
                            开户行：北京朝阳北路支行<br/>
                            持卡人：赵坤<br/>
                            银行账号：<span class="no">6217 8601 0000 2786 250</span>
                        </div>
                    </li>
                    <li class="bank-item">
                        <div class="bank-logo">
                            <img src="../assets/images/bank/bank_zs.png" alt="">
                        </div>
                        <div class="bank-info">
                            开户行：招商银行北京分行青年路支行<br/>
                            持卡人：赵坤<br/>
                            银行账号：<span class="no">6214 8601 9927 9999</span>
                        </div>
                    </li>
                    <li class="bank-item">
                        <div class="bank-logo">
                            <img src="../assets/images/bank/bank_gs.png" alt="">
                        </div>
                        <div class="bank-info">
                            开户行：北京分行东城支行东城支营东直门内分理处<br/>
                            持卡人：赵坤<br/>
                            银行账号：<span class="no">6222 0802 0002 5991 111</span>
                        </div>
                    </li>
                    <li class="bank-item">
                        <div class="bank-logo">
                            <img src="../assets/images/bank/bank_js.png" alt="">
                        </div>
                        <div class="bank-info">
                            开户行：中国建设银行北京市分行东直门支行储蓄专柜<br/>
                            持卡人：赵坤<br/>
                            银行账号：<span class="no">6214 9900 1020 8263</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 成功弹出框 -->
        <div class="layer" v-if="isSuccess">
            <div class="success-box">
                <div class="title">温馨提示 <div class="close" @click="isSuccess=false">×</div></div>
                <div class="info">
                    <img src="../assets/images/success.png" alt="">
                    <span>保存成功</span>
                </div>
            </div>
        </div>
        <!-- 取消订单弹出框 -->
        <div class="layer" v-if="isCancel">
            <div class="cancel-box">
                <div class="title">
                    温馨提示
                </div>
                <div class="info">
                    <span>您是否确认取消订单？</span>
                </div>
                <div class="btn">
                    <span class="cancel" @click="isCancel=false">暂不取消</span>
                    <span class="confim" @click="cancelOrder">确认取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header/BackFlightHeader.vue'
import Footer from '@/components/Footer/Footer.vue'

export default {
    name: 'OrderInfo',
    data () {
        return {
            pageTitle: '订单号（）',
            payMethod: '',
            invoiceziqu: false,
            invoiceyouji: false,
            alipayShow: false,
            otherPay: false,
            bankPay: false,
            isSuccess: false,
            isCancel: false,
            orderID: '',
            orderInfo: {},
            xingchengdan: {
                name: '',
                tel: '',
                code: '',
                address: ''
            },
            jianjin: '',
            isMadeJiangjin: false,
            startFlightList: [],
            backFlightList: []
        }
    },
    components: {
        Header,
        Footer
    },
    methods: {
        checkTime: function(v){
            let t = v
            if(v.length === 8){
                t = v.substr(0,4) + '/' + v.substr(4,2) + '/' + v.substr(6,2)
            }
            return t
        },
        checkStr: function(v){
            return v.replace(/[\r\n]/g,'<br/>')
        },
        travelMethod: function(v){
            if(v == 1){
                this.invoiceziqu = true
            }else if(v==2){
                this.invoiceyouji = true
            }
        },
        checkInvoice: function(){
            if(this.xingchengdan.name.length<1){
                this.utils.alert(this, '请输入用户姓名')
            }else if(this.xingchengdan.tel.length != 11 || !this.utils.checkTel(this.xingchengdan.tel)){
                this.utils.alert(this, '请输入正确的手机号码')
            }else if(this.xingchengdan.address.length<2){
                this.utils.alert(this, '请输入邮寄地址')
            }else {
                this.invoiceyouji = false
            }
        },
        saveOrder: function(){
            let that = this
            let params = {
                params:{
                    OrderID: this.orderID,
                    shiyongjianjin: this.orderInfo.shiyongjiangjin,
                    fkfs: this.orderInfo.FKFS,
                    xingchengdanFS: this.orderInfo.SPFS,
                    xingchengdanBZ: this.xingchengdan.name+'$'+this.xingchengdan.tel+'$'+this.xingchengdan.code+'$'+this.xingchengdan.address,
                    shifujine: this.orderInfo.shifujine
                }
            }
            console.log(params)
            this.utils.ajax({
                name: this,
                uri: 'OrderZFservlet',
                method: 'get',
                params,
                success: res => {
                    if(res.status === 200 && res.data == '1'){
                        this.utils.alert(this, '保存成功').then(()=>{
                            that.$router.go(-1)
                        })
                    }else{
                        this.utils.alert(this, '保存失败，请刷新重试')
                    }
                },
                fail: (e)=>{
                    console.log(e)
                    this.utils.alert(this, '保存失败，请刷新重试')
                }
            })
        },
        cancelOrder: function(){
            let that = this   //确认的回调
            this.$http.get(this.uriw + 'CancelDD', {
                params: {
                    "OrderID": this.orderID,
                    "quxiaoyuanyin": '其它原因'
                }
            }).then(res => {
                if(res.data == '1'){
                    that.utils.alert(that, '取消成功！').then(()=>{
                        that.$router.go(-1)
                    })
                }else{
                    that.utils.alert(that, '取消失败，请刷新重试！')
                }
            })
            .catch((e)=> {
                if(e.request.timeout<1){
                    that.utils.alert(that, '取消成功！').then(()=>{
                        that.$router.go(-1)
                    })
                }else{
                    that.utils.alert(that, '取消失败，请刷新重试！')
                }
            })    
        },
        checkJianjin: function(){
            let jz = parseInt(this.jianjin) || 0
            if(jz > 0){
                let kyje = parseInt(this.orderInfo.jiangjin) || 0
                if(jz > kyje){
                    this.jianjin = this.orderInfo.jiangjin
                    this.utils.alert(this, '请输入不大于' + kyje + '奖金金额')
                }else if(this.orderInfo.zongjia - jz < 0){
                    this.jianjin = this.orderInfo.zongjia
                    this.utils.alert(this, '请输入不大于' + this.orderInfo.zongjia + '奖金金额')
                }else{
                    this.orderInfo.shiyongjiangjin = jz
                    this.orderInfo.shifujine = this.orderInfo.zongjia - jz
                    this.isMadeJiangjin = true
                }
            }else{
                this.utils.alert(this, '请输入正确的奖金金额')
            }
        }
    },
    watch:{
        payMethod: function(v){
            if(v === '支付宝'){
                this.alipayShow = true
            }else if(v === '银行汇款'){
                this.bankPay = true
            }else{                
                this.otherPay = true
            }
        }
    },
    created () {
        this.orderID = this.$route.query.oid
        this.pageTitle = '订单号（' + this.orderID + '）'
        let param = new URLSearchParams();
        param.append("OrderID", this.orderID);
        this.utils.ajax({
            name: this,
            uri: 'OrderInfoServlet',
            method: 'post',
            params: param,
            success: res => {
                console.log(res)
                if(res.status === 200){
                    this.orderInfo = res.data
                    if(res.data.SPBZ.length > 0){
                        var bz = res.data.SPBZ.split('$')
                        this.xingchengdan.name = bz[0]
                        this.xingchengdan.tel = bz[1]
                        this.xingchengdan.code = bz[2]
                        this.xingchengdan.address = bz[3]
                    }
                    if(parseInt(this.orderInfo.shiyongjiangjin) > 0){
                        this.isMadeJiangjin = true
                    }else if(parseInt(this.orderInfo.jiangjin) < 1){
                        this.isMadeJiangjin = true
                    }

                    if(res.data.airType === "往返"){
                        let len = parseInt(res.data.hangban.length/2)
                        this.startFlightList = res.data.hangban.slice(0,len)
                        this.backFlightList = res.data.hangban.slice(len,res.data.hangban.length)
                    }else{
                        this.startFlightList = res.data.hangban
                    }
                    
                }
            },
            fail: ()=>{
                this.utils.alert(this, '订单查询失败，请刷新重试')
            }
        })
    }
}
</script>

<style lang="scss">
    $red: #f00000;
    @mixin box{
        background-color: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
    }
    @mixin boxs{
        background-color: #fff;
        position: absolute;
        left: .5rem;
        top: 50%;
        width: 6.5rem;
        box-sizing: border-box;
        border-radius: .1rem;
    }
    @mixin title{
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        font-size: .3rem;
        color: #000;
        font-weight: bold;
        border-bottom: .02rem solid #ccc;
    }
    .orderinfo-box{
        background-color: #eee;
        font-size: .24rem;
        .red{ color: $red; }
        .userinfo{
            height: 3.6rem;
            background-color: $red;
            .user{
                display: flex;
                padding: 0 .5rem;
                .head{
                    margin-top: .2rem;
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 1.2rem;
                    overflow: hidden;
                    img{
                        width: 120%;
                        margin: -.12rem;
                    }
                }
                .link{
                    margin-top: .6rem;
                    color: #fff;
                    padding: 0 .3rem;
                    font-size: .28rem;
                    border-right: .02rem solid #fff;
                    height: .64rem;
                    .name{
                        margin-top: -.2rem;
                    }
                    .phone{
                        margin-top: .1rem;
                        background: url('../assets/images/tel.png') no-repeat left center;
                        background-size: auto 80%;
                        background-position-x: .1rem;
                        border: .02rem solid #fff;
                        border-radius: .1rem;
                        padding-left: .5rem;
                        box-sizing: border-box;
                        a{
                            color: #fff;
                        }
                    }
                }
                .ercode{                    
                    width: 1.4rem;
                    height: 1.4rem;
                    background-color: #fff;
                    box-sizing: border-box;
                    margin-top: .2rem;
                    margin-left: .4rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .flightinfo{
            padding: 0 .14rem;
            box-sizing: border-box;
            margin-bottom: .1rem;
            .flight-time{
                margin-top: -.9rem;
                height: .9rem;
                line-height: .9rem;
                border-bottom: .02rem solid #ccc;
                border-top-left-radius: .1rem;
                border-top-right-radius: .1rem;
                box-sizing: border-box;
                background-color: #fff;
                font-size: .3rem;
                color: #333;
                padding-left: .4rem;
                span{
                    border-left: .1rem solid $red;
                    padding-left: .2rem;
                    color: #777;
                }
            }
            .flight-box{
                background-color: #fff;
                .flight-box-info{
                    position: relative;
                    color: #777;
                    font-size: .28rem;
                    height: .8rem;
                    line-height: .8rem;
                    padding-left: 1rem;
                    box-sizing: border-box;
                    span{
                        position: absolute;
                        left: 0;
                        top: .2rem;
                        color: #fff;
                        background-color: #ff2323;
                        font-size: .24rem;
                        width: .8rem;
                        height: .4rem;
                        line-height: .4rem;
                        text-align: center;
                        border-top-right-radius: .1rem;
                        border-bottom-right-radius: .1rem;
                    }
                }
                .flight-box-list{
                    padding: 0 .6rem;
                    .flight-box-item{
                        position: relative;
                        display: flex;
                        justify-content: center;
                        height: 1.4rem;
                        margin-top: .1rem;
                        border-bottom: .02rem solid #ccc;
                        padding-top: .2rem;
                        box-sizing: border-box;
                        .change-flight-num{
                            position: absolute;
                            top: -.3rem;
                            background-color: #fff;
                            padding: 0 .1rem;
                            color: #aaa;
                        }
                        .info-go{
                            font-size: .26rem;
                            color: #999;
                            text-align: center;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            div{
                                font-size: .32rem;
                                color: #333;
                                line-height: .6rem;
                            }
                        }
                        .info-to{
                            font-size: .26rem;
                            color: #999;
                            text-align: left;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            div{
                                font-size: .32rem;
                                color: #333;
                                line-height: .6rem;
                                span{
                                    font-size: .2rem;
                                    color: #999;
                                }
                            }
                        }
                        .change{
                            width: 2rem;
                            background: url('../assets/images/flight.png') no-repeat center;
                            background-size: 1.35rem;
                            color: #f7a461;
                            text-align: center;
                            font-size: .24rem;
                            line-height: .7rem;
                        }
                    }
                    .flight-box-item:first-child{
                        padding: 0;
                    }
                    .flight-box-item:last-child{
                        border: 0;
                    }
                }
            }
            .flight-in{
                border-bottom-left-radius: .08rem;
                border-bottom-right-radius: .08rem;                
            }
            .flight-out{
                margin-top: .2rem;
                border-radius: .08rem;
            }
        }
        .infotitle{
            position: relative;
            height: .8rem;
            line-height: .8rem;
            background-color: #fff;
            border-bottom: .02rem solid #ccc;
            padding-left: .4rem;
            .title{
                position: absolute;
                height: .3rem;
                line-height: .3rem;
                margin-top: .25rem;
                font-size: .3rem;
                color: #000;
                font-weight: bold;
                border-left: .06rem solid $red;
                padding-left: .2rem;
                .sub-title{
                    font-size: .24rem;
                    font-weight: normal;
                    color: #777;
                    margin-left: .2rem;
                }
                .other-title{
                    color: #f99743;
                }
            }
        }
        .person-box{
            background-color: #fff;
            margin-bottom: .08rem;
            .person-list{
                padding: 0 .5rem;
                .person-item{
                    padding: .2rem 0;
                    border-bottom: .02rem solid #ccc;
                    .name{
                        font-size: .3rem;
                        color: #333;
                        line-height: .6rem;
                    }
                    .info{
                        line-height: .5rem;
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        font-size: .24rem;
                        color: #777;
                    }
                }
                .person-item:last-child{
                    border: 0;
                }
            }
        }
        .limit-box{
            background-color: #fff;
            margin-bottom: .08rem;
            padding: .2rem .5rem;
            box-sizing: border-box;
            .limit-list{
                .limit-item{
                    line-height: .5rem;
                    color: #777;
                    font-size: .28rem;
                }
            }
            .remarks{
                margin-top: .2rem;
                display: flex;
                justify-content: space-between;
                .remark-text{
                    position: relative;   
                    width: 5.6rem;
                    height: 1.2rem;
                    textarea{
                        border: 0;
                        width: 100%;
                        height: 100%;
                        background-color: #ccc;               
                        resize: none;
                        border-radius: .1rem;
                        padding: .2rem;
                        box-sizing: border-box;
                    }
                }
                .remark-text::after{                    
                    content: '';
                    position: absolute;
                    top: .1rem;
                    right: -.2rem;
                    border-width: 0 0 .2rem .2rem;
                    border-style: solid;
                    border-color: transparent transparent transparent #ccc;
                }
                .name{
                    font-size: .28rem;
                    color: #777;
                    line-height: .2rem;
                }
            }
        }
        .info-box{
            background-color: #fff;
            padding: .2rem .4rem;
            box-sizing: border-box;
            margin-bottom: .08rem;
            .info-list{
                display: flex;
                color: #777;
                .info-item{
                    width: 2.4rem;
                    line-height: .6rem;
                    .red{
                        color: $red;
                    }
                }
                .info-item:nth-child(3){
                    width: 1.9rem;
                }
            }
        }
        .pay-box{
            background-color: #fff;
            padding: .2rem;
            box-sizing: border-box;
            .pay-reward{
                color: #777;
                font-size: .28rem;
                padding: 0 .2rem .2rem .2rem;
                box-sizing: border-box;
                border-bottom: .04rem solid #ccc;
                .usable-reward{
                    padding-top: .1rem;
                    span{
                        color: $red;
                    }
                }
                .made-reward{
                    display: flex;
                    line-height: .8rem;
                    input{
                        width: 1rem;
                        height: .4rem;
                        margin-top: .2rem;
                        border: .02rem solid #ccc;
                        box-sizing: border-box;
                    }
                    .btn{
                        width: 1rem;
                        height: .5rem;
                        line-height: .5rem;
                        margin-top: .15rem;
                        margin-left: 1rem;
                        border: .02rem solid $red;
                        text-align: center;
                        color: $red;
                        border-radius: .1rem;
                    }
                }
            }
            .pay-method{
                .title{
                    font-size: .3rem;
                    color: #000;
                    font-weight: bold;
                    line-height: .8rem;
                    height: .8rem;
                    padding-left: .2rem;
                    box-sizing: border-box;
                    .red{
                        color: #f00000;
                        font-size: .28rem;
                        font-weight: normal;
                    }
                }
                .method-list{
                    padding: 0 .2rem;
                    box-sizing: border-box;
                    .method-item{
                        height: .8rem;
                        line-height: .8rem;
                        border-top: .02rem solid #ccc;
                        padding-left: .24rem;
                        box-sizing: border-box;
                        font-size: .28rem;
                        color: #777;
                        .rd-item{
                            height: .8rem;
                            box-sizing: border-box;
                            .mint-cell{
                                min-height: .8rem;
                                background: none;
                                .mint-radio-input:checked + .mint-radio-core{
                                    background-color: #fd0d0d;
                                    border-color: #fd0d0d;
                                }
                                .mint-cell-wrapper{
                                    background: none !important;
                                }
                            }
                            .mint-radiolist-title{
                                display: none;
                            }
                        }
                    }
                    .method-item:first-child{
                        border: 0;
                    }
                    .yhk{
                        background: url('../assets/images/pay_yhk.png') no-repeat center;
                        background-position-x: .2rem;
                        background-size: .29rem;
                    }
                    .zfb{
                        background: url('../assets/images/pay_zfb.png') no-repeat center;
                        background-position-x: .2rem;
                        background-size: .29rem;
                    }
                    .sm{
                        background: url('../assets/images/pay_sm.png') no-repeat center;
                        background-position-x: .2rem;
                        background-size: .26rem;
                    }
                    .xj{
                        background: url('../assets/images/pay_xj.png') no-repeat center;
                        background-position-x: .2rem;
                        background-size: .3rem;
                    }
                    .wx{
                        background: url('../assets/images/pay_wechar.png') no-repeat center;
                        background-position-x: .2rem;
                        background-size: .35rem;
                    }
                    .online{
                        background: url('../assets/images/pay_online.png') no-repeat center;
                        background-position-x: .2rem;
                        background-size: .39rem;
                    }
                }
            }
        }
        .travel-box{
            padding: .2rem .4rem;
            box-sizing: border-box;
            display: flex;
            font-size: .28rem;
            .btn{
                border: .02rem solid #f99743;
                color: #f99743;
                border-radius: .1rem;
                margin-right: .2rem;
                height: .5rem;
                padding: 0 .2rem;
                line-height: .5rem;
                text-align: center;
            }
            .cur{
                color: #fff;
                background-color: #f99743;
            }
            .explain{
                height: .5rem;
                line-height: .5rem;
                color: #777;                
            }
        }
        .btn-box{
            margin-top: 1rem;
            background: #fff;
            display: flex;
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            .btn{
                width: 50%;
                font-size: .28rem;
                color: $red;
            }
            .btn-ok{
                background-color: $red;
                color: #fff;
            }
        }
        /*发票自取*/
        .invoice-invite{
            background-color: #fff;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 3.6rem;
            padding: 0 .2rem;
            box-sizing: border-box;
            .title{
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                font-size: .3rem;
                color: #000;
                font-weight: bold;
                border-bottom: .02rem solid #ccc;
            }
            .info{
                display: flex;
                padding: .6rem;
                font-size: .28rem;
                .red{
                    color: $red;
                }
            }
            .beizhu{
                text-align: center;
                color: #f99743;
                font-size: .24rem;
            }
        }
        /*发票寄送地址*/
        .invoice-post{
            @include box;
            height: 5rem;
            padding: 0 .2rem;
            box-sizing: border-box;
            .title{
                @include title;
                display: flex;
                justify-content: space-between;
                padding: 0 .2rem;
            }
            .info{
                padding: .2rem;
                color: #777;
                .info-item{
                    height: .8rem;
                    line-height: .8rem;
                    display: flex;
                    font-size: .28rem;
                    .name{ width: 1.42rem; }
                    .txt{
                        width: 4rem;
                        height: .6rem;
                        line-height: .6rem;
                        border: .02rem solid #ccc;
                        box-sizing: border-box;
                        margin-top: .1rem;
                        border-radius: .06rem;
                    }
                    .textarea{
                        width: 5rem;
                        height: 1rem;
                        resize: none;
                    }
                }
            }
            .beizhu{
                text-align: center;
                color: #f99743;
                font-size: .24rem;
            }
        }
        /*支付宝付款方式*/
        .alipay-box{
            @include boxs;
            height: 3rem;
            margin-top: -1.5rem;
            .title{
                @include title;
                width: 5.5rem;
                margin: 0 auto;
                text-align: left;
                color: $red;
            }
            .info{
                padding: .5rem 0;
                font-size: .28rem;
                text-align: center;
                line-height: .6rem;
                .zh{
                    color: #f99743;
                }
            }
        }
        /*其它付款方式*/
        .otherpay-box{
            @include boxs;
            height: 3rem;
            margin-top: -1.5rem;
            .title{
                @include title;
                width: 5.5rem;
                margin: 0 auto;
                text-align: left;
                color: $red;
            }
            .info{
                padding: .5rem .3rem;
                font-size: .3rem;
                text-align: left;
                line-height: .6rem;
                color: #f99743;
                box-sizing: border-box;
            }
        }
        /*银行汇款方式*/
        .bankpay-box{
            @include boxs;
            width: 7.5rem;  
            height: 100%;
            left: 0;
            top: 0;
            overflow: scroll;
            border-radius: 0;
            .title{
                @include title;
                width: 6.5rem;
                margin: 0 auto;
                text-align: left;
                color: $red;
            }
            .bank-list{
                padding: .2rem 0;
                .bank-item{
                    display: flex;
                    padding: .1rem 0;
                    .bank-logo{
                        width: 2rem;
                        text-align: right;
                        margin-right: .2rem;
                        padding-top: .08rem;
                        img{                            
                            width: 1.68rem;
                        }
                    }
                    .bank-info{
                        width: 5rem;
                        line-height: .4rem;
                        padding-right: .2rem;
                        box-sizing: border-box;
                        .no{
                            color: #f99743;
                        }
                    }
                }
            }
        }
        /*保存成功弹出框*/
        .success-box{
            @include boxs;
            padding: 0 .2rem;
            box-sizing: border-box;
            height: 2.8rem;
            margin-top: -1.4rem;
            .title{
                @include title;
                text-align: left;
                padding: 0 .1rem;
                box-sizing: border-box;
                .close{
                    float: right;
                    width: .8rem;
                    font-size: .5rem;
                    text-align: right;
                }
            }
            .info{
                text-align: center;
                padding: .6rem 0;
                display: flex;
                justify-content: center;
                line-height: .8rem;
                box-sizing: border-box;
                font-size: .3rem;
                img{
                    width: .74rem;
                    height: .74rem;
                    margin-right: .2rem;
                }
            }
        }
        /*取消订单确认弹出框*/
        .cancel-box{
            @include boxs;
            padding: 0 .2rem;
            box-sizing: border-box;
            height: 3.6rem;
            margin-top: -1.8rem;
            overflow: hidden;
            .title{
                @include title;
                text-align: left;
                padding: 0 .1rem;
                box-sizing: border-box;
            }
            .info{
                text-align: center;
                padding: .7rem 0;
                display: flex;
                justify-content: center;                
                line-height: .6rem;
                box-sizing: border-box;
                font-size: .3rem;
            }
            .btn{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: .8rem;
                line-height: .8rem;
                background-color: $red;
                color: #fff;
                display: flex;
                font-size: .28rem;
                letter-spacing: .04rem;
                .cancel{
                    width: 50%;
                    background-color: #eee;
                    color: #666;
                    text-align: center;
                }
                .confim{
                    width: 50%;
                    text-align: center;
                }
                .confim:active{
                    background-color: #E00000;
                }
            }
        }
    }
</style>
