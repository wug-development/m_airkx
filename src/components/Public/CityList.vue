<template>
    <transition name="fd" enter-active-class="fdin" leave-active-class="fdout">
    <div id="CityList" class="citylist-box" v-if="isShow">
        <div class="citylist-box-title">
            <div>{{cTitle}}</div>
            <span class="citylist-close" @click="close">取消</span>
        </div>
        <div class="citylist-box-search">
            <input type="text" class="citylist-box-search-text" placeholder="请输入城市拼音/中文/英文/三字码" @input="textChange" maxlength="20" />
        </div>
        <div class="citylist-group">
            <div class="citylist-group-item" v-for="(c, index) in dataList" :key="index">
                <div class="citylist-group-item-label">{{c.index}}</div>
                <ul class="citylist-group-item-list">
                    <li class="citylist-group-item-list-item" v-for="(item, i) in c.items" :key="i" @click="chooseCity(item)">{{item.city}}-{{item.Portname}}</li>
                </ul>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
export default {
    props: ['cityShow', 'cityList', 'cityTitle'],
    name: 'CityList',
    data () {
        return {
            dataList: [],
            isShow: false,
            cTitle: '',
            textc: ''
        }
    },
    methods: {
        close: function(){
            this.dataList = this.cityList
            this.textc = ''
            this.$emit("close", true)
        },
        textChange: function(e){
            let v = e.target.value
            this.textc = v
            this.dataList = getCityList(JSON.stringify(this.cityList), v)            
        },
        chooseCity: function(item){
            this.dataList = this.cityList
            this.textc = ''
            this.$emit("chooseCity", item);
        }
    },
    watch: {
        cityShow(v){
            this.isShow = v;
        },
        cityList(v){
            this.dataList = v;
        }
    },
    created() {
        this.cTitle = this.cityTitle
    }
}

function getCityList(list, v){
    list = JSON.parse(list)
    return list.filter(function(i){
        i.items = i.items.filter(function(e){
            return e.Pinyin.includes(v.toLocaleUpperCase()) || e.Display.includes(v.toLocaleUpperCase()) || e.city.includes(v.toLocaleUpperCase()) || e.Portname.includes(v.toLocaleUpperCase()) || (e.en && e.en.includes(v.toLocaleUpperCase()))
        })
        return i.items.length>0
    })
}
</script>

<style lang="scss">
    .citylist-box{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 999;
        overflow: hidden;
        font-size: .24rem;
        .citylist-box-title{
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
            .citylist-close{
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
        .citylist-box-search{
            position: absolute;
            left: 0;
            top: .9rem;
            z-index: 9;
            width: 100%;
            height: .9rem;
            line-height: .9rem;
            box-sizing: border-box;
            border-bottom: .02rem solid #efefef;
            background-color: #fff;
            .citylist-box-search-text{
                display: block;
                height: .6rem;
                line-height: .6rem;
                border: .02rem solid #ccc;
                width: 6.5rem;
                margin: .15rem auto;
                box-sizing: border-box;
                border-radius: .08rem;
                padding-left: .2rem;
                background: url('../../assets/images/find.png') no-repeat right center;
                background-size: auto 80%;
                background-position-x: 5.9rem;
                font-size: .24rem;
            }
        }
        .citylist-group{
            padding-top: 1.8rem;
            height: 100%;
            overflow-y: scroll;
            box-sizing: border-box;
            -webkit-overflow-scrolling: touch;
            .citylist-group-item{
                border-bottom: .02rem solid #eee;
                .citylist-group-item-label{
                    height: .8rem;
                    line-height: .8rem;
                    font-size: .32rem;
                    padding-left: .2rem;
                    box-sizing: border-box;
                    color: #333;
                    background-color: #efefef;
                }
                .citylist-group-item-list{
                    padding: 0;
                    margin: 0;
                    font-size: .28rem;
                    .citylist-group-item-list-item{
                        height: .8rem;
                        line-height: .8rem;
                        padding-left: .2rem;
                        box-sizing: border-box;
                        border-bottom: .02rem solid #efefef;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: normal;
                    }
                }
            }
        }
    }  
    .fdin{
        animation: fadeink .3s ease-out 0s 1 forwards;
    }
    .fdout{
        animation: fadeoutk .3s ease-in 0s 1 forwards;
    }
    @keyframes fadeink{
        0% { left: 7.5rem }
        100%{ left: 0rem }
    }
    @keyframes fadeoutk{
        0% { left: 0rem }
        100%{ left: 7.5rem }
    }
</style>
