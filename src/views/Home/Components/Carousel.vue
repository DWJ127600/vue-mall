<template>
  <div class="carousel">
    <el-carousel height="500px" arrow="never" :interval="8000">
      <el-carousel-item v-for="banner in bannerList" :key="banner.id">
        <RouterLink :to="banner.hrefUrl"><el-image :src="banner.imgUrl" /></RouterLink>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { type Banner } from '@/composables/useHomePageBanner'

interface Props {
  bannerList: Banner[]
}

withDefaults(defineProps<Props>(), {
  bannerList: () => [],
})
</script>

<style scoped lang="scss">
.carousel {
  width: 1240px;
  height: 500px;

  .el-image {
    width: 100%;
    height: 500px;
  }
}
</style>
