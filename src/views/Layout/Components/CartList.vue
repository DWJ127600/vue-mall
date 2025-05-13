<template>
  <el-popover width="400px" :popper-style="{ padding: '0', border: 'none' }">
    <template #reference>
      <div class="icon-container">
        <i class="iconfont icon-cart"></i>
        <em>{{ cartStore.cartList.length }}</em>
      </div>
    </template>
    <div class="list-container">
      <el-scrollbar class="cart-list" height="310px">
        <div class="item" v-for="cart in cartStore.cartList" :key="cart.id">
          <RouterLink :to="`/detail/${cart.id}`">
            <el-image :src="cart.picture" />
            <div class="info">
              <p class="ellipsis-2">
                {{ cart.name }}
              </p>
              <p class="attr ellipsis">{{ cart.attrsText }}</p>
            </div>
            <div class="number">
              <p class="price">&yen;{{ cart.price }}</p>
              <p class="count">x{{ cart.count }}</p>
            </div>
          </RouterLink>
          <i class="iconfont icon-close-new" @click="cartStore.deleteCart(cart.skuId)"></i>
        </div>
      </el-scrollbar>
      <div class="footer">
        <div class="total">
          <p>共 {{ cartStore.allCount }} 件商品</p>
          <p class="price">&yen; {{ cartStore.allPrice.toFixed(2) }}</p>
        </div>
        <el-button size="large" type="primary" @click="$router.push('/cart')"
          >去购物车结算</el-button
        >
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import useCartStore from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<style scoped lang="scss">
.icon-container {
  width: 50px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  position: relative;
  cursor: pointer;

  .icon-cart {
    font-size: 22px;
    color: #333;
  }

  em {
    position: absolute;
    right: 0;
    top: 0;
    font: 12px/1 Arial;
    color: #fff;
    background-color: $helpColor;
    border-radius: 10px;
    padding: 1px 6px;
  }
}

.list-container {
  height: 400px;

  .cart-list {
    height: 310px;
    padding: 10px 10px 0;

    .item {
      padding: 10px 0;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;

      a {
        display: inline-flex;
        align-items: center;

        .el-image {
          width: 85px;
          height: 85px;
        }

        .info {
          padding: 0 10px;
          width: 200px;
          font-size: 14px;

          .attr {
            color: #999;
            padding-top: 5px;
          }
        }

        .number {
          width: 70px;
          font-size: 16px;
          text-align: center;
          padding-right: 5px;

          .price {
            color: $priceColor;
          }

          .count {
            color: #999;
            margin-top: 5px;
          }
        }
      }

      .icon-close-new {
        padding: 4px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.5s;
      }

      &:hover {
        .icon-close-new {
          opacity: 1;
        }
      }
    }
  }

  .footer {
    height: 70px;
    padding: 10px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8f8f8;

    .total {
      padding-left: 10px;
      color: #999;

      .price {
        font-size: 18px;
        color: $priceColor;
      }
    }
  }
}
</style>
