<template>
  <header>
    <div class="flex-container">
      <RouterLink to="/"><el-image :src="logo" /></RouterLink>
      <el-menu
        mode="horizontal"
        :ellipsis="false"
        :default-active="activeIndex"
        @select="handleSelect"
      >
        <el-menu-item index="首页"><RouterLink to="/">首页</RouterLink></el-menu-item>
        <el-menu-item v-for="category in categoryList" :key="category.id" :index="category.name">
          <RouterLink :to="`/category/${category.id}`">{{ category.name }}</RouterLink>
        </el-menu-item>
      </el-menu>
      <el-input placeholder="搜一搜" :prefix-icon="Search" />
      <CartList />
    </div>
  </header>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png'
import CartList from './CartList.vue'
import useCategoryStore from '@/stores/categoryStore'
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const activeIndex = ref('首页')
const categoryStore = useCategoryStore()
const { categoryList } = storeToRefs(categoryStore)

const route = useRoute()
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') activeIndex.value = '首页'
  },
)

const handleSelect = (index: string) => {
  activeIndex.value = index
  // 这里可以添加路由跳转或其他逻辑
}
</script>

<style scoped lang="scss">
header {
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 99;

  .flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    .el-image {
      width: 240px;
      vertical-align: top;
    }

    .el-menu {
      border-bottom: none;
      --el-menu-hover-bg-color: #fff;
      margin: 0 20px;

      .el-menu-item {
        font-size: 16px;
        padding: 0 20px;
      }
    }

    .el-input {
      width: 240px;
      margin-right: 10px;
    }
  }
}
</style>
