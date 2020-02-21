<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 监听鼠标点击
      startY: true, // Y轴方向初始化
      probeType: this.probeType, // 侦测位置
      pullUpLoad: this.pullUpLoad // 监听上拉
    });
    // 2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position)
        this.$emit("scroll", position);
      });
    }
    // 3.监听上拉滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log('上拉加载更多');
        this.$emit("pullingUp");
      })
    }
  },
  components: {},
  methods: {
    scrollTo(x = 0, y = 0, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      //   console.log('---');
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style scoped>
</style>
