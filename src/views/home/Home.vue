<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="placeholder"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      :probe-type="3"
      @scroll="toTop"
      ref="scroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @loadImgSwiper="loadSwiperImg" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control ref="tabControl" :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "@/common/utils";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffSetTop: 0,
      isTabFixed: false,
      saveY: 0,
      homeImgListener: null
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    // GoodsListItem,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    //   1.请求多个数据
    this.getHomeMultidata();
    // 1.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听图片加载完成
    // this.$bus.$on("itemImgLoad", () => {
    //   this.$refs.scroll.refresh();
    // })
    // 防抖动加载，减少refresh执行次数
    const refresh = debounce(this.$refs.scroll.refresh, 500);

    // 保存需要监听的函数
    this.homeImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.homeImgListener);
    // 获取tabControl的offsetTop
    // this.tabOffSetTop = this.$refs.tabControl.$el.offsetTop
    // console.log(this.tabOffSetTop);
  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      this.currentType = Object.keys(this.goods)[index];
      // switch (index) {
      //   case 0:
      //     this.currentType = 'pop'
      //     break;
      //   case 1:
      //     this.currentType = 'new'
      //     break;
      //   case 2:
      //     this.currentType = 'sell'
      //     break;
      // }
      // console.log(this.$refs.tabControl2.currentIndex);
      this.$refs.placeholder.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo();
    },
    toTop(position) {
      // console.log(position)
      // 1.判断backTop是否显示
      this.isShowBackTop = -position.y > 700 ? true : false;
      // 判断tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffSetTop ? true : false;
    },
    loadMore() {
      // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
      // console.log('上拉加载更多');
    },
    loadSwiperImg() {
      // console.log('------')
      this.tabOffSetTop = this.$refs.tabControl.$el.offsetTop;
    },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 1);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 保存Y值
    this.saveY = this.$refs.scroll.scroll.y;
    // 取消全局事件的监听$bus$on
    this.$bus.$off("itemImgLoad", this.homeImgListener);
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px;
  padding-bottom: 50px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}

/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
</style>
