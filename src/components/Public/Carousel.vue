<template>
  <div class="carousel-box" :style="{height: bannerH}">
    <el-carousel :interval="4000" height="3.4rem" indicator-position="none" type="card">
      <el-carousel-item v-for="(item, i) in bannerArr" :key="i">
        <div class="vname"><img :src="item.path" alt=""><div v-if="item.name">{{item.name}}<span><label>{{item.price}}</label>起</span></div></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

  export default {
    props: ['bannerList', 'bannerHeight'],
    name: 'Carousel',
    data: function () {
      return {
        bannerArr: [],
        bannerH: ''
      }
    },
    watch: {
      bannerList (val) {
        this.bannerArr = val
      },
      bannerHeight (val) {
        this.bannerH = val
      }
    }
  }
</script>

<style lang="scss">
  .carousel-box{
    .vname{
      color: #333;
      font-size: .28rem;
      img{
        display: block;
      }
      div{
        background-color: #fff;
        padding: 0 .1rem;
        box-sizing: border-box;
        span{
          float: right;
          label{
            color: #f00000;
          }
        }
      }
    }

  }
</style>
