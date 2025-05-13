<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/category/${categoryList.parentId}` }"
        >{{ categoryList.parentName }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ categoryList.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="goods-list">
      <el-tabs v-model="pageInfo.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="content" v-infinite-scroll="loadInfinitely" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItems :goods="goodsList"></GoodsItems>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSubCategoryGoods, { apiClient, type PageInfo } from '@/composables/useSubCategoryGoods'
import useTwoLevelCategory from '@/composables/useTwoLevelCategory'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItems from '../Home/Components/GoodsItems.vue'

const route = useRoute()
const { categoryList } = useTwoLevelCategory(route.params.id as string)
const disabled = ref(false)

const pageInfo = ref<PageInfo>({
  categoryId: route.params.id as string,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
})
const { goodsList } = useSubCategoryGoods(pageInfo.value)

const loadGoodsList = async (pageInfo: PageInfo) => {
  const data = await apiClient.post(pageInfo)
  goodsList.value = data.result.items
}
const tabChange = () => {
  pageInfo.value.page = 1
  loadGoodsList(pageInfo.value)
}

const loadInfinitely = async () => {
  console.log(1)
  const oldGoodsList = [...goodsList.value]

  pageInfo.value.page++
  await loadGoodsList(pageInfo.value)
  if (goodsList.value.length === 0) disabled.value = true
  goodsList.value = [...oldGoodsList, ...goodsList.value]
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin: 25px 0;
  font-size: 14px;
}
.goods-list {
  padding: 20px 15px;
  background-color: #fff;

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
}
</style>
