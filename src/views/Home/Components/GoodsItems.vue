<template>
  <RouterLink v-for="item in goods" :key="item.id" :to="`/detail/${item.id}`">
    <el-card :body-style="{ padding: '0' }" shadow="hover">
      <el-image :src="item.picture" :lazy="isLazy" />
      <p class="ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </el-card>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Goods } from '@/composables/useCategory'

interface Props {
  goods: Goods[]
  isLazy?: boolean
}

withDefaults(defineProps<Props>(), {
  goods: () => [],
  isLazy: false,
})
</script>

<style scoped lang="scss">
a {
  width: 230px;

  .el-image {
    width: 100%;
  }

  p {
    font-size: 16px;
    margin-top: 8px;
    text-align: center;
  }

  .desc {
    color: #999;
  }

  .price {
    color: $priceColor;
  }
}
</style>
