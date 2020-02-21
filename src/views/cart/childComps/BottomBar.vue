<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :isChecked="checkAll" @click.native="checkAllClick" />
    <span class="all">全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去下单({{checkedLength}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => item.checked)
        .reduce((pre, item) => {
          return (pre += item.price * item.count);
        }, 0)
        .toFixed(2);
    },
    checkedLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    checkAll() {
      return !(
        this.$store.state.cartList.length == 0 ||
        this.$store.state.cartList.find(item => !item.checked)
      );
    }
  },
  methods: {
    checkAllClick() {
      if (this.checkAll) {
        this.$store.state.cartList.forEach(item => (item.checked = false));   // 若全部选中，点击变成全部不选中
      } else {
        this.$store.state.cartList.forEach(item => (item.checked = true));    // 若没有全部选中，点击变成全部选中
      }
    },
    calcClick() {
      if(!this.checkAll) {
        this.$toast.show('请先选择商品', 1500)
      }
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 10px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 20px;
  font-size: 16px;
  font-weight: 700;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
  font-size: 16px;
}

.all {
  margin-left: -2px;
}
</style>
