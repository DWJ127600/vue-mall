<template>
  <ProductPanel title="人气推荐" sub-title="人气爆款 不容错过">
    <el-row :gutter="6">
      <el-col :span="6" v-for="item in hotList" :key="item.id">
        <el-card :body-style="{ padding: '0' }" shadow="hover">
          <RouterLink to="/">
            <el-image :src="item.picture" lazy />
            <p>{{ item.title }}</p>
            <p class="desc">&yen;{{ item.alt }}</p>
          </RouterLink>
        </el-card>
      </el-col>
    </el-row>
  </ProductPanel>
</template>

<script setup lang="ts">
import useHot from '@/composables/useHot'
import ProductPanel from './ProductPanel.vue'

const { hotList } = useHot()
</script>

<style scoped lang="scss">
.el-image {
  width: 100%;
}

p {
  font-size: 20px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 8px;
}

.desc {
  font-size: 16px;
  color: #999;
}
</style>
