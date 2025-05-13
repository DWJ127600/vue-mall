<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ categoryList.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 轮播图 -->
    <Carousel :bannerList="bannerList" />
    <!-- 分类列表 -->
    <div class="category-list">
      <h3>全部分类</h3>
      <ul>
        <li v-for="item in categoryList.children" :key="item.id">
          <RouterLink :to="`/sub-category/${item.id}`">
            <el-image :src="item.picture" fit="cover" />
            <p>{{ item.name }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <!-- 分类产品列表 -->
    <div class="goods-list" v-for="item in categoryList.children" :key="item.id">
      <h3>- {{ item.name }} -</h3>
      <div class="content">
        <GoodsItems :goods="item.goods" :isLazy="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCategoryBanner from '@/composables/useCategoryBanner'
import useOneLevelCategory, { type OneLevelCategory } from '@/composables/useOneLevelCategory'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import GoodsItems from '../Home/Components/GoodsItems.vue'
import Carousel from '../Home/Components/Carousel.vue'
import APIClient from '@/services/api-client'

const route = useRoute()
const { categoryList } = useOneLevelCategory(route.params.id as string)
const { bannerList } = useCategoryBanner()

const loadCategoryList = async (id: string) => {
  const apiClient = new APIClient<OneLevelCategory>('/category')
  const data = await apiClient.get({ params: { id } })
  categoryList.value = data.result
}

onBeforeRouteUpdate((to) => {
  loadCategoryList(to.params.id as string)
})
</script>

<style scoped lang="scss">
.el-breadcrumb {
  margin: 25px 0;
  font-size: 14px;
}

h3 {
  font-size: 28px;
  color: #666;
  font-weight: normal;
  text-align: center;
  line-height: 100px;
}

.category-list {
  margin-top: 20px;
  background-color: #fff;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    padding: 0 20px 15px;

    a {
      display: block;
      font-size: 16px;
      text-align: center;

      .el-image {
        width: 130px;
        height: 130px;

        :deep(.el-image__inner) {
          object-position: center;
        }
      }

      p {
        line-height: 40px;
      }

      &:hover {
        color: $xtxColor;
      }
    }
  }
}

.goods-list {
  background-color: #fff;
  margin-top: 20px;

  .content {
    padding: 0 15px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
}
</style>
