<template>
    <div class="recommend">
        <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: "RecommendView",
    data() {
        return {}
    },
    props: {
        recommends: {
             type: Array,
             default() {
                 return []
             }
        }
    },
    components: {},
    methods: {}
}
</script>

<style scoped>
.recommend {
    display: flex;
    text-align: center;
    font-size: 14px;
    border-bottom: 8px solid #eee;
}

.recommend-item {
    flex: 1;
    padding: 10px 5px;
}

.recommend-item img {
    width: 100%;
    margin-bottom: 5px;
}
</style>
