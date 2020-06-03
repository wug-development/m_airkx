<template>
    <div id="DatePicker" class="datepicker-box" v-if="isShow">
        <div class="datepicker-box-title">
            <div>{{dateTitle}}</div>
            <span class="datepicker-close" @click="close">取消</span>
        </div>
        <ul class="datepicker-box-week">
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
        </ul>
        <div class="datepicker-list-box">
            <div class="datepicker-list" v-for='(items, i) in dateList' :key='i'>
                <div class="list-month">
                    {{items.name}}
                </div>
                <ul class="date-list">
                    <li :class='"date-item "+item.state' v-for='(item, index) in items.date' :key='index' @click="chooseDate(item)">
                        {{item.day}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'dateShow', 'startDate', 'endDate'],
    name: 'DatePicker',
    data () {
        return {
            dateTitle: '',
            isShow: false,
            dateList: [],
            sDate: '',
            eDate: ''
        }
    },
    methods: {
        close: function(){
            this.$emit("close", true)
        },
        chooseDate: function(v){
            if(v.date && v.state == ''){
                let t = v.date.replace(/\-/g, '/')
                this.$emit("chooseDate", t)
            }            
        }
    },
    watch: {
        startDate(v){
            this.sDate = v
        },
        endDate(v){
            this.eDate = v
        },
        dateShow(v){
            this.isShow = v;
            if(v){
                this.sDate = this.sDate || this.utils.dateFormat('yyyy-MM-dd')
                this.eDate = this.eDate || this.utils.dateFormat(this.utils.getAfterNDate(this.sDate, 1, 'y') ,'yyyy-MM-dd')
                let sd = this.sDate.split('-')
                let ed = this.eDate.split('-')
                let m = 0;
                if(ed[0] - sd[0] >= 0){
                    m = (ed[0] - sd[0])*12 + 1
                    m += ed[1] - sd[1]
                    let y = sd[0]
                    this.dateList = []
                    for(let i=0; i<m; i++){
                        let km = parseInt(sd[1])+i
                        let w = 0 
                        if(km > 12){
                            y = parseInt(sd[0]) + 1
                            km = km - 12
                        }
                        w = (new Date(y+'/'+ km +'/1')).getDay()
                        let item = {
                            name: y+'年'+km+'月',
                            date: []
                        }     
                        let dcount = getMonthDay(km, y)
                        let itemNum = 0
                        for(let j=0; j<w; j++){
                            item.date.push({date:'', day: ''})
                        }
                        for(let j=1; j<=dcount; j++){
                            let state = ''
                            if(i == 0){
                                state = j < sd[2]? 'no':''                            
                            }else if(i+1 == m){
                                state = j > sd[2]? 'no':''
                            }                
                            item.date.push({date:y+'-'+ km + '-' + (j<10?'0'+j:j), day: j, state: state})
                        }
                        let n = 7- ((w + dcount) % 7)
                        n = n==7 ? 0 : n
                        for(let j = 0; j < n; j++){
                            item.date.push({date:'', day: ''})
                        }
                        this.dateList.push(item)
                    }

                }
            }            
        }
    },
    created() {
        this.dateTitle = this.title
        this.sDate = this.startDate || this.utils.dateFormat('yyyy-MM-dd')
        this.eDate = this.endDate || this.utils.dateFormat('yyyy-MM-dd')        
    }

}

//获取每个月有多少天
function getMonthDay(month, year){
    let dayNum = 0
    if (1 == month || 3 == month || 5 == month || 7 == month || 8 == month || 10 == month || 12 == month) {
        return dayNum = 31
    } else if (4 == month || 6 == month || 9 == month || 11 == month) {
        return dayNum = 30
    } else if (2 == month && isLeapYear(year)) {
        return dayNum = 29
    } else {
        return dayNum = 28
    }
}
//判断是否闰年
function isLeapYear(year) {
    if (0 == year%100 && 0 == year%400) {
        return true;
    }else if (year%100 != 0 && year%4 ==0) {
        return true;
    } else {
        return false;
    }
}

</script>

<style lang="scss">
    .datepicker-box{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 999;
        overflow: hidden;
        color: #333;
        .datepicker-box-title{
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9;
            width: 100%;
            color: #333;
            font-size: .32rem;
            height: .9rem;
            line-height: .9rem;
            text-align: center;
            font-weight: 700;
            border-bottom: .02rem solid #aaa;
            background-color: #fff;
            box-sizing: border-box;
            .datepicker-close{
                position: absolute;
                top: .15rem;
                right: .3rem;
                border: .02rem solid #ccc;
                width: 1rem;
                height: .6rem;
                line-height: .6rem;
                box-sizing: border-box;
                text-align: center;
                border-radius: .06rem;
                font-weight: 400;
            }
        }
        .datepicker-box-week{
            position: absolute;
            left: 0;
            top: .9rem;
            z-index: 9;
            width: 100%;
            height: .8rem;
            line-height: .8rem;
            background-color: #fff;
            display: flex;
            justify-content: space-around;
            font-size: .3rem;
            border-bottom: .02rem solid #efefef;
            box-sizing: border-box;
            li:first-child, li:last-child{
                color: #f00000;
            }
        }
        .datepicker-list-box{
            width: 100%;
            height: 100%;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
            padding-top: 1.7rem;
            box-sizing: border-box;
            .datepicker-list{
                background-color: #fff;
                .list-month{
                    height: .8rem;
                    line-height: .8rem;
                    font-size: .28rem;
                    background-color: #efefef;
                    text-align: center;
                }
                .date-list{
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    .date-item{
                        width: 1rem;
                        height: .8rem;
                        line-height: .8rem;
                        font-size: .28rem;
                        text-align: center;
                    }
                    .no{
                        color: #ccc;
                    }
                }
            }
        }
    }
</style>
