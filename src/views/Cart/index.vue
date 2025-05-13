<template>
  <div class="container">
    <div class="cart-container">
      <table>
        <thead>
          <tr>
            <th width="120">
              <el-checkbox :model-value="cartStore.isAll" @change="handleUpdateAll" />
            </th>
            <th width="400">商品信息</th>
            <th width="220">单价</th>
            <th width="180">数量</th>
            <th width="180">小计</th>
            <th width="140">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in cartList" :key="cart.id">
            <td>
              <el-checkbox v-model="cart.selected" @change="cartStore.updateUserCart(cart)" />
            </td>
            <td>
              <div class="info-container">
                <RouterLink :to="`/detail/${cart.id}`"><el-image :src="cart.picture" /></RouterLink>
                <div class="info">
                  <p class="ellipsis-2">
                    {{ cart.name }}
                  </p>
                  <p class="attr ellipsis">{{ cart.attrsText }}</p>
                </div>
              </div>
            </td>
            <td class="center">
              <p>&yen;{{ cart.price }}</p>
            </td>
            <td class="center">
              <el-input-number
                v-model="cart.count"
                :min="1"
                @change="cartStore.updateUserCart(cart)"
              />
            </td>
            <td class="center">
              <p class="price">&yen;{{ (parseFloat(cart.price) * cart.count).toFixed(2) }}</p>
            </td>
            <td class="center">
              <el-popconfirm
                title="确认删除吗?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="cartStore.deleteCart(cart.skuId)"
              >
                <template #reference>
                  <el-link type="primary" :underline="false">删除</el-link>
                </template>
              </el-popconfirm>
            </td>
          </tr>
          <tr v-if="cartList.length === 0">
            <td colspan="6">
              <div class="empty-container">
                <el-empty description="购物车列表为空">
                  <el-button type="primary" @click="$router.push('/')">随便逛逛</el-button>
                </el-empty>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="action">
      <div class="batch">
        共 {{ cartStore.allCount }} 件商品，已选择 {{ cartStore.selectedCount }} 件，商品合计：
        <span class="price">¥ {{ cartStore.selectedPrice.toFixed(2) }} </span>
      </div>
      <el-button size="large" type="primary" @click="$router.push('/checkout')">下单结算</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCartStore from '@/stores/cartStore'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { cartList } = storeToRefs(cartStore)

const handleUpdateAll = (selected: boolean) => {
  cartStore.checkAll(
    cartList.value.map((item) => item.skuId),
    selected,
  )
}
</script>

<style scoped lang="scss">
.container {
  margin-top: 20px;
}

.cart-container {
  background: #fff;
  color: #666;

  table {
    border-collapse: collapse;

    tr {
      border-bottom: 1px solid #f5f5f5;
    }

    th,
    td {
      padding: 10px;

      &:first-child {
        text-align: left;
        padding-left: 30px;
      }
    }

    th {
      font-size: 16px;
      font-weight: normal;
      line-height: 50px;
    }
  }
}

.info-container {
  display: flex;
  align-items: center;

  .el-image {
    width: 130px;
    height: 130px;
    margin-right: 10px;
  }

  .info {
    width: 280px;
    font-size: 16px;

    .attr {
      font-size: 14px;
      color: #999;
      margin-top: 5px;
    }
  }
}

.center {
  text-align: center;
}

.price {
  color: $priceColor;
  font-size: 16px;
}

.empty-container {
  padding: 120px 0;
}

.action {
  height: 80px;
  margin-top: 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding: 0 30px;

  .price {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
