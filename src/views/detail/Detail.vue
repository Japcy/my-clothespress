<template>
  <div class="detail">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backHomeClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <span
          class="title-item"
          :class="{active: index === currentIndex}"
          @click="titleClick(index)"
          v-for="(item, index) in titles"
          :key="index"
        >{{item}}</span>
      </div>
      <!-- <div slot="right">...</div> -->
    </nav-bar>
    <div class="detail-info">
      <scroll ref="scroll" class="content" @scroll="detailScroll" :probeType="3">
        <detail-swiper :topImgs="topImgs" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
        <detail-param-info ref="param" :paramInfo="paramInfo" />
        <detail-comment-info ref="comment" :commentInfo="commentsInfo" />
        <goods-list ref="recommend" :goods="recommends" />
      </scroll>
    </div>
    <detail-bottom-bar @addToCart="addCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from "components/common/navbar/NavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import { debounce } from "@/common/utils";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";
// import { backTopMixin } from "@/common/mixin";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      topImgs: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentsInfo: {},
      recommends: [],
      detailImgListener: null,
      themeYs: [],
      getThemeY: null,
      isShowBackTop: false
    };
  },
  components: {
    NavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  // mixins: [backTopMixin],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求数据
    getDetail(this.iid).then(res => {
      // 获取顶部的轮播图
      const data = res.result;
      this.topImgs = data.itemInfo.topImages;
      // 创建商品的详细信息对象
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentsInfo = data.rate.list[0];
      }
    });
    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    // 4.给getThemeY赋值

    this.getThemeY = debounce(() => {
      this.themeYs = [];
      this.themeYs.push(0);
      this.themeYs.push(this.$refs.param.$el.offsetTop);
      this.themeYs.push(this.$refs.comment.$el.offsetTop);
      this.themeYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeYs.push(Number.MAX_VALUE);
      // console.log("----");
    }, 100);
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      //   console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeYs[index], 500);
    },
    backHomeClick() {
      this.$router.back();
    },
    imageLoad() {
      this.$refs.scroll.refresh();

      // console.log("------");
      this.getThemeY();
    },
    detailScroll(position) {
      // console.log(position);
      // 获取Y值
      const positionY = -position.y;
      // 和主题的Y值对比
      for (let i of this.themeYs.keys()) {
        if (
          this.currentIndex != i &&
          positionY >= this.themeYs[i] &&
          positionY < this.themeYs[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(i);
        }
      } // 判断backTop是否显示
      this.isShowBackTop = -position.y > 700 ? true : false;
    },
    backClick() {
      this.$refs.scroll.scrollTo();
    },
    addCart() {
      // 添加到购物车
      // 1.获取商品信息
      const product = {};
      product.image = this.topImgs[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;
      // console.log('---');
      // this.$store.commit('addCart', product)
      this.$store.dispatch("addCart", product).then(res => {
        // console.log(res);
        this.$toast.show(res, 1500)
      });
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.detailImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.detailImgListener);
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.detailImgListener);
  }
};
</script>

<style scoped>
.detail {
  height: 100vh;
  position: relative;
  z-index: 9;
}

/* .nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
} */

.title {
  display: flex;
  font-size: 14px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back img {
  width: 20px;
  height: auto;
  margin-top: 12px;
  margin-left: 18px;
}

.detail-info {
  height: calc(100% - 44px - 58px);
}

.content {
  background-color: #fff;
  height: 100%;
  overflow: hidden;
}
</style>
