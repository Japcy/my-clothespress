import {POP, NEW, SELL} from "./const";
import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo();
    },
    toTop(position) {
      // console.log(position)
      // 1.判断backTop是否显示
      this.isShowBackTop = -position.y > 700 ? true : false;
      // 判断tabControl是否吸顶
      // this.isTabFixed = -position.y > this.tabOffSetTop ? true : false;
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
