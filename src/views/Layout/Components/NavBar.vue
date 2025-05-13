<template>
  <nav>
    <ul>
      <template v-if="userInfo.token">
        <li>
          <el-icon>
            <User />
          </el-icon>
          <span>{{ userInfo.account }}</span>
        </li>
        <li>我的订单</li>
        <li @click="$router.push('/member')">会员中心</li>
        <li class="popconfirm-container">
          <el-popconfirm
            title="确认退出吗?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleLogout"
          >
            <template #reference>
              <span>退出登录</span>
            </template>
          </el-popconfirm>
        </li>
      </template>
      <template v-else>
        <li @click="handleLogin">亲，请登录</li>
        <li>帮助中心</li>
        <li>关于我们</li>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import useCartStore from '@/stores/cartStore'
import useUserStore from '@/stores/userStore'
import { User } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

// const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const cartStore = useCartStore()

const handleLogin = () => {
  router.push('/login')
}
const handleLogout = () => {
  userStore.clearUserInfo()
  cartStore.clearAllCart()

  // if (route.path.search('/detail') === 0) {
  //   router.push('/login')
  // }
}
</script>

<style scoped lang="scss">
nav {
  height: 60px;
  background-color: #333;
  color: #cdcdcd;

  ul {
    height: 100%;
    display: flex;
    justify-content: end;

    li {
      padding: 0 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: background-color 0.3s ease;

      &:hover {
        color: $xtxColor;
        background-color: #292929;
      }

      .el-icon {
        margin-right: 5px;
        font-size: 16px;
      }

      .el-tooltip__trigger {
        padding: 0 20px;
        height: 100%;
        line-height: 60px;
      }
    }

    .popconfirm-container {
      padding: 0;
    }
  }
}

.el-menu {
  justify-content: flex-end;
  align-items: center;
  border-bottom: none;
  --el-menu-bg-color: #333;
  --el-menu-text-color: #cdcdcd;
  --el-menu-hover-bg-color: red;

  .el-menu-item {
    border: none;
  }
}
</style>
