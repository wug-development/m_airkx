<template>
    <div id="AddPerson" class="addperson-box">
        <Header class="header" :pageTitle="pageTitle"></Header>
        <div class="person-form">
            <div class="notice">请确保填写信息准备无误，顾客姓名必须是拼音或英文</div>
            <div class="form-box">
                <ul class="text-box">
                    <li class="text-item">
                        <span class="text-item-key">姓名：</span>
                        <input type="text" placeholder="与乘机人证件一致">
                        <div class="use" @click="showChengjiren">常用乘机人</div>
                    </li>
                    <li class="text-item">
                        <span class="text-item-key middle">出生年月：</span>
                        <input type="text" placeholder="请选择出生日期">
                    </li>
                    <li class="text-item">
                        <span class="text-item-key middle">护照号码：</span>
                        <input type="text" placeholder="请填写护照号码">
                    </li>
                    <li class="text-item">
                        <span class="text-item-key lager">护照有效期：</span>
                        <input type="text" placeholder="请选择护照有效期">
                    </li>
                    <li class="text-item">
                        <span class="text-item-key">性别：</span>
                        <mt-radio v-model="sex" :options="['先生', '女士']"></mt-radio>
                    </li>
                </ul>
            </div>
            <div class="new-person">
                <div class="chengjiren">
                    <ul class="text-box">
                        <li class="text-item">
                            <span class="text-item-key">姓名：</span>
                            <input type="text" placeholder="与乘机人证件一致">
                            <div class="del">—</div>
                        </li>
                        <li class="text-item">
                            <span class="text-item-key middle">出生年月：</span>
                            <input type="text" placeholder="请选择出生日期">
                        </li>
                        <li class="text-item">
                            <span class="text-item-key middle">护照号码：</span>
                            <input type="text" placeholder="请填写护照号码">
                        </li>
                        <li class="text-item">
                            <span class="text-item-key lager">护照有效期：</span>
                            <input type="text" placeholder="请选择护照有效期">
                        </li>
                        <li class="text-item">
                            <span class="text-item-key">性别：</span>
                            <mt-radio v-model="sex" :options="['先生', '女士']"></mt-radio>
                        </li>
                    </ul>
                    <ul class="text-box">
                        <li class="text-item">
                            <span class="text-item-key">姓名：</span>
                            <input type="text" placeholder="与乘机人证件一致">
                            <div class="del">—</div>
                        </li>
                        <li class="text-item">
                            <span class="text-item-key middle">出生年月：</span>
                            <input type="text" placeholder="请选择出生日期">
                        </li>
                        <li class="text-item">
                            <span class="text-item-key middle">护照号码：</span>
                            <input type="text" placeholder="请填写护照号码">
                        </li>
                        <li class="text-item">
                            <span class="text-item-key lager">护照有效期：</span>
                            <input type="text" placeholder="请选择护照有效期">
                        </li>
                        <li class="text-item">
                            <span class="text-item-key">性别：</span>
                            <mt-radio v-model="sex" :options="['先生', '女士']"></mt-radio>
                        </li>
                    </ul>
                </div>
                
                <div class="add"><span>+新增乘机人</span><label class="cur">成人</label><label class="cur">儿童</label></div>

            </div>
        </div>
        <div class="amount">
            <span>￥11384</span>
            <a href="">下一步</a>
        </div>
        <Footer class="footer"></Footer>
        <PickerList :dataList='dataList' :isShow="showPerson" v-on:selValue="checkUser"></PickerList>
    </div>
</template>

<script>
import Header from '@/components/Header/BackFlightHeader.vue'
import Footer from '@/components/Footer/Footer.vue'
import PickerList from '@/components/Public/PickerList.vue'

import { setInterval } from 'timers';
export default {
    name: 'AddPerson',
    data() {
        return {
            pageTitle: '填写联系人',
            tgqLayer: false,
            sex: '',
            dataList: [],
            showPerson: false,
        }
    },
    components: {
        Header,
        Footer,
        PickerList
    },
    methods : {
        showChengjiren () {
            this.showPerson = true
            this.dataList = [{ values: ['2018','2017','2016','2018','2017','2016']}]
        },
        checkUser (val) {
            this.showPerson = false
            console.log(val[0])
        }
    },
    created () {
        
    }
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
            .notice{
                background: url("../../assets/images/notice.png") no-repeat;
                background-size: .32rem .32rem;
                background-position-x: .6rem;
                background-position-y: center;
                background-color: #ffffdb;
                height: .8rem;
                line-height: .8rem;
                padding-left: 1rem;
                color: #6e6e6e;
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
                        border: .02rem solid #ff0000;
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
                }
                input::placeholder{
                    color: #aaa;
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
