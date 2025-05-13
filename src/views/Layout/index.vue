<template>
  <NavBar />
  <LayoutHeader initialIndex="首页" />
  <RouterView />
  <LayoutFooter />
</template>

<script setup lang="ts">
import NavBar from './Components/NavBar.vue'
import LayoutHeader from './Components/LayoutHeader.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
</script>

<style scoped>
.el-header {
  height: auto;
  padding: 0;
}

.el-footer {
  height: auto;
  padding: 0;
}
</style>
