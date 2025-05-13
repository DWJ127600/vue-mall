<template>
    <div class="container">
        <LeftCategory />
        <Carousel :bannerList="bannerList" />
    </div>
    <FreshGoods />
    <PopularGoods />
    <GoodsList />
</template>

<script setup lang="ts">
import Carousel from './Components/Carousel.vue'
import FreshGoods from './Components/FreshGoods.vue'
import LeftCategory from './Components/LeftCategory.vue'
import PopularGoods from './Components/PopularGoods.vue'
import GoodsList from './Components/GoodsList.vue'
import useHomePageBanner from '@/composables/useHomePageBanner'

const { bannerList } = useHomePageBanner()
</script>

<style scoped lang="scss">
.container {
    position: relative;
}
</style>