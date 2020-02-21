<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <div class="info">
        <img :src="item.icon" alt="">
        <!-- <img src="~assets/img/profileicon/email.svg" alt /> -->
        {{item.info}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
};
</script>

<style scoped>
#list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
}

#list .item {
  height: 44px;
  line-height: 44px;
  position: relative;
}

img {
  width: 24px;
  height: auto;
  position: relative;
  top: 7px;
}

.item .info {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 5px;
}

.item:last-of-type .info {
  border-bottom: none;
}
</style>
