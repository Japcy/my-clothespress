<template>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="loadSwiper"/>
        </a>
      </swiper-item>
    </swiper>
</template>

<script type="text/ecmascript-6">
import { Swiper, SwiperItem } from "components/common/swiper";


export default {
    name: "HomeSwiper",
    data() {
        return {
            isLoad: false
        }
    },
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        loadSwiper() {
            // console.log('123-----')
            if (!this.isLoad) {
                this.$emit('loadImgSwiper')
                this.isLoad = true                
            }
        }
    }
}
</script>

<style scoped>
</style>
