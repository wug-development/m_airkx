<template>
    <div id="IndexList" class="indexList-box">
      <div class="indexList-box-title">
        {{indexListTitle}}
        <span @click="cancel">取消</span>
      </div>
      <mt-index-list>
        <mt-index-section v-for="(s, index) in listData" :key="index" :index="s.index">
          <mt-cell v-for="(item, i) in s.items" :key="i" :title="item.city + '-' + item.Portname" @click.native="selCity(item)"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
</template>

<script>
    export default {
        props: ['cityList', 'title'],
        name: "IndexList",
        data () {
            return {
                listData: [],
                indexListTitle: ''
            }
        },
        methods: {
            cancel: function () {
              this.$emit('cancel')
            },
            selCity: function (val) {
              this.$emit('selCity', val)
            }
        },
        watch: {
            cityList (arr) {
                this.listData = arr
            }
        },
        created() {
            this.indexListTitle = this.title
        }
    }
</script>

<style lang="scss">
  .indexList-box{
    position: fixed;
    z-index: 11;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    color: #666;
    .indexList-box-title{
      position: relative;
      color: #333;
      font-size: .32rem;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      font-weight: bold;
      border-bottom: .02rem solid #eee;
      span{
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
        font-weight: normal;
      }
    }
    .mint-indexsection-index{
      font-size: .24rem;
    }
  }
</style>
