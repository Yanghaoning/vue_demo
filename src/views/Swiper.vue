<template>
    <div class="swiper-container">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide class='s_img' v-for="(item,index) in lists" :key="index">
          <img :src="item.thumb" alt="">
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev swiper-button-black"></div>
      <div class="swiper-button-next swiper-button-black"></div>
    </div>
</template>
<script>
  import {getList} from "../api";
  import { Swiper, SwiperSlide } from "vue-awesome-swiper";
  import "swiper/css/swiper.css";
  export default {
    name: "Test",
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: ".swiper-pagination",
          },
          loop: true,
          //切换速度
          speed: 1000,
          //左右箭头按钮
          navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          },
          autoplay: {
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
        },
        lists:[]
      };
    },
    /* 引入组件 */
    components: {
      Swiper,
      SwiperSlide,
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper;
      },
    },
    mounted() {
      this.swiper.slideTo(1, 1000, false);
      this.list()
    },
    methods:{
      list(){
        let data = {
          sid: "6311f5e7889777cf"
        }
        getList(data).then(res=>{
          this.lists = res.data.data.list
        })
      }
    }
  };
</script>
<style scoped>
  .swiper-container {
    width:600px;
    height: 400px;
    text-align: center;
  }
  .s_img{
    width:300px;
  }
  .s_img img{
    width:100%;
    height:100%;
  }
</style>
