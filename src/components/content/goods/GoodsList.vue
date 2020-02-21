<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item" class="goods-item"/>
    <!-- {{goods}} -->
  </div>
</template>

<script type="text/ecmascript-6">
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      defaule() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {
    GoodsListItem
  },
  methods: {}
};
</script>

<style scoped>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

/* .goods-item {
    flex: 50%;
} */
</style>
