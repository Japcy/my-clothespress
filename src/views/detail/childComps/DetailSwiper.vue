<template>
    <!-- <div class="Detail-swiper"> -->
        <swiper class="detail-swiper">
            <swiper-item v-for="(item, index) in topImgs" :key="index">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
    <!-- </div> -->
</template>

<script type="text/ecmascript-6">

import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
    name: "DetailSwiper",
    data() {
        return {}
    },
    props: {
        topImgs: {
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
    methods: {}
}
</script>

<style scoped>

.detail-swiper {
    height: 300px;
    overflow: hidden;
}
</style>
