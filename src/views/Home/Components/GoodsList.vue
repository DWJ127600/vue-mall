<template>
  <div class="goods-list">
    <ProductPanel
      v-for="partition in partitionList"
      :title="partition.name"
      :subTitle="partition.saleInfo"
      :key="partition.id"
    >
      <div class="content">
        <RouterLink to="/" class="img">
          <el-image :src="partition.picture" fit="cover" class="left-image" />
        </RouterLink>
        <div class="list">
          <GoodsItems :goods="partition.goods" :isLazy="true" />
        </div>
      </div>
    </ProductPanel>
  </div>
</template>

<script setup lang="ts">
import usePartition from '@/composables/usePartition'
import ProductPanel from './ProductPanel.vue'
import GoodsItems from './GoodsItems.vue'

const { partitionList } = usePartition()
</script>

<style scoped lang="scss">
.goods-list {
  background: #fff;
  margin-top: 20px;

  .content {
    display: flex;

    .left-image {
      width: 240px;
      height: 100%;
    }

    .list {
      // flex-grow: 1;
      margin-left: 20px;
      // display: grid;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      row-gap: 15px;
      // grid-template-columns: repeat(4, minmax(0, 1fr));
      // grid-template-rows: repeat(2, 1fr);
    }
  }
}
</style>
