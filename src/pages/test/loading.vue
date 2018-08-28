<template>
<!-- 圆形(仅使用图标或旋转器作为内容!)，带加载状态  -->
<q-page>
    <q-btn :loading="loading" round icon="map" color="primary" @click="showToast">
        <q-spinner-puff slot="loading" />
    </q-btn>





</q-page>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            msg: 'Welcome to Your Vue.js App',
            total: 1,
            current: 1,
            pagegroup: 10,
            isShowPagination: true,
            count:199
        }
    },
    methods: {
        pagechange(currentPage) {
            console.log('currentPage=', currentPage);
        },
        showToast(event) {
        }

    }
}
</script>