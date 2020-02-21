<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">
                <h3>购物车({{this.$store.state.cartList.length}})</h3>
            </div>
        </nav-bar>
        <cart-list></cart-list>
        <bottom-bar />
    </div>
</template>

<script type="text/ecmascript-6">

import NavBar from "components/common/navbar/NavBar";
import CartList from './childComps/CartList';
import BottomBar from './childComps/BottomBar';

export default {
    name: "Cart",
    data() {
        return {}
    },
    components: {
        NavBar,
        CartList,
        BottomBar,
    },
    methods: {}
}
</script>

<style scoped>
.nav-bar {
    background-color: var(--color-tint);
    color: #fff;
}
</style>
