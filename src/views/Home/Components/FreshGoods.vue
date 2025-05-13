<template>
  <ProductPanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <el-row :gutter="6">
      <el-col :span="6" v-for="item in newList" :key="item.id">
        <el-card :body-style="{ padding: '0' }" shadow="hover">
          <RouterLink :to="`/detail/${item.id}`">
            <el-image :src="item.picture" lazy />
            <p class="ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </el-card>
      </el-col>
    </el-row>
  </ProductPanel>
</template>

<script setup lang="ts">
import useNew from '@/composables/useNew'
import ProductPanel from './ProductPanel.vue'

const { newList } = useNew()
</script>

<style scoped lang="scss">
.el-image {
  width: 100%;
}

p {
  font-size: 18px;
  text-align: center;
  margin-top: 8px;
}

.price {
  color: $priceColor;
}
</style>
