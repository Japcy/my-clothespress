<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
          <div class="empty" v-show="isEmpty">购物车还是空的</div>

      <cart-list-item v-for="(item, index) in CartList" :key="index" :itemInfo="item" />
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  data() {
    return {
      isEmpty: true
    };
  },
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    CartList() {
      //   console.log(this.$store.state.cartList);
      return this.$store.state.cartList;
    }
  },
  methods: {},
  activated() {
    this.$refs.scroll.refresh();
    if (this.CartList.length != 0) {
      this.isEmpty = false
    }
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 44px);
}

.content {
  height: 100%;
  overflow: hidden;
}

.empty {
  /* height: 100%; */
  font-size: 30px;
  padding-top: 50%;
  text-align: center;
  color: #ddd;
}
</style>
