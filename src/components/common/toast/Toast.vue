<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: "Toast",
    data() {
        return {
            message: '',
            isShow:false
        }
    },
    components: {},
    methods: {
        show(message='请输入提示信息', duration=1500) {
            this.isShow = true
            this.message = message

            setTimeout(() => {
                this.isShow = false;
                this.message = ''
            }, duration)
        }
    }
}
</script>

<style scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    z-index: 99;
    color: #fff;
    background-color: rgba(0, 0, 0, .8);
    border-radius: 8px;
}
</style>
