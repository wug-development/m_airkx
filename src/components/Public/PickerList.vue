<template>
    <div id="PickerList" v-if="popupVisible" class="pickerlist-box layer">
        <mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="5" :valueKey="valueKey" :show-toolbar="true" ref="picker">
            <a class="usi-btn-cancel" @click="$emit('cancelList', false)">取消</a>
            <a class="usi-btn-sure" @click="genderConfirm">确定</a>
        </mt-picker>
    </div>
</template>

<script>
export default {
    props: ['dataList', 'isShow', 'keys'],
    name: 'PickerList',
    data () {
        return {
            slots: [],
            popupVisible: false,
            currentValue: '',
            valueKey: ''
        }
    },
    methods: {
        onValuesChange (val) {
            this.currentValue = val.getValues()
        },
        genderConfirm (){
            this.$emit('selValue', this.currentValue)
        }
    },
    watch: {
        dataList (val) {
            this.slots = val
        },
        isShow (val) {
            this.popupVisible = val
        },
        keys (val) {
            this.valueKey = val
        }
    }
}
</script>

<style lang="scss">
    .pickerlist-box{
        .picker{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: #fff;
            .picker-toolbar{
                display: flex;
                padding: 0 .2rem;
                justify-content: space-between;
                .usi-btn-cancel{
                    background-color: #ccc;
                    color: #000;
                    font-size: .28rem;
                    width: 1rem;
                    height: .6rem;
                    line-height: .6rem;
                    margin-top: .1rem;
                    border-radius: .06rem;
                    text-align: center;
                }
                .usi-btn-sure{
                    background-color: #f00000;
                    color: #fff;
                    font-size: .28rem;
                    width: 1rem;
                    height: .6rem;
                    line-height: .6rem;
                    margin-top: .1rem;
                    border-radius: .06rem;
                    text-align: center;
                }
                .usi-btn-sure:active{
                    background-color: #b00000;
                }
            }
        }
    }
</style>
