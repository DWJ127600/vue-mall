<template>
  <div class="container" v-if="detail.name">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/category/${detail.categories[1].id}`"
        >{{ detail.categories[1].name }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="`/category/sub/${detail.categories[0].id}`">
        {{ detail.categories[0].name }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ detail.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 商品信息 -->
    <div class="info-container">
      <div class="goods-info">
        <div class="media">
          <!-- 图片预览 -->
          <ImageView :imageList="detail.mainPictures" />

          <!-- 数据统计 -->
          <el-space :size="15" :spacer="spacer">
            <div>
              <p>销量人气</p>
              <p>{{ detail.salesCount }}+</p>
              <p><i class="iconfont icon-task-filling"></i>销量人气</p>
            </div>
            <div>
              <p>商品评价</p>
              <p>{{ detail.commentCount }}+</p>
              <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
            </div>
            <div>
              <p>收藏人气</p>
              <p>{{ detail.collectCount }}+</p>
              <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
            </div>
            <div>
              <p>品牌信息</p>
              <p>{{ detail.brand?.name }}</p>
              <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
            </div>
          </el-space>
        </div>
        <div class="content">
          <p class="name">{{ detail.name }}</p>
          <p class="desc">{{ detail.desc }}</p>
          <p class="price">
            <span>{{ detail.oldPrice }}</span>
            <span> {{ detail.price }}</span>
          </p>
          <div class="service">
            <dl>
              <dt>促销</dt>
              <dd>12月好物放送，App领券购买直降120元</dd>
            </dl>
            <dl>
              <dt>服务</dt>
              <dd>
                <span>无忧退货</span>
                <span>快速退款</span>
                <span>免费包邮</span>
                <a href="javascript:;">了解详情</a>
              </dd>
            </dl>
          </div>
          <!-- sku组件 -->
          <Sku :goodsSku="{ specs: detail.specs, skus: detail.skus }" @change="skuChange" />

          <!-- 数据组件 -->

          <!-- 按钮组件 -->
          <div>
            <el-button size="large" class="btn" @click="addCart"> 加入购物车 </el-button>
          </div>
        </div>
      </div>
      <div class="goods-footer">
        <!-- 商品详情 -->
        <nav>商品详情</nav>
        <div class="goods-detail">
          <!-- 属性 -->
          <ul class="attrs">
            <li v-for="item in detail.details.properties" :key="item.value">
              <span class="attr-name">{{ item.name }}</span>
              <span class="attr-value">{{ item.value }}</span>
            </li>
          </ul>
          <!-- 图片 -->
          <div class="img-container">
            <el-image v-for="img in detail.details.pictures" :src="img" :key="img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type EmitData } from '@/components/Sku/Index.vue'
import useDetail from '@/composables/useDetail'
import useCartStore from '@/stores/cartStore'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { h, ref } from 'vue'
import { useRoute } from 'vue-router'

const spacer = h('div', {
  style: {
    width: '1px',
    height: '80px',
    backgroundColor: '#e4e4e4',
  },
})

const route = useRoute()
const { detail } = useDetail(route.params.id as string)

// const router = useRouter()
// const userStore = useUserStore()
// if (!userStore.userInfo.token) {
//   router.push('/login')
// }

const cartStore = useCartStore()
const count = ref(1)
let skuObj = {} as EmitData
const skuChange = (sku: EmitData) => {
  skuObj = sku
}
const addCart = () => {
  if (skuObj.skuId) {
    cartStore.addCart({
      id: detail.value.id,
      name: detail.value.name,
      picture: detail.value.mainPictures[0],
      count: count.value,
      skuId: skuObj.skuId || '',
      price: skuObj.price || '',
      attrsText: skuObj.specsText || '',
      selected: true,
    })
  } else {
    ElMessage.warning('请选择规格')
  }
}
</script>

<style scoped lang="scss">
.el-breadcrumb {
  margin: 25px 0;
  font-size: 14px;
}

.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  padding: 30px 50px;

  .media {
    width: 50%;
    padding-right: 30px;

    .el-space {
      display: flex;
      justify-content: center;
      text-align: center;
      margin-top: 25px;

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 16px;
            margin-right: 5px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }

  .content {
    width: 50%;

    .name {
      font-size: 22px;
    }

    .desc {
      color: #999;
      margin-top: 10px;
    }

    .price {
      margin-top: 10px;

      span {
        &::before {
          content: '¥';
          font-size: 14px;
        }

        &:first-child {
          color: $priceColor;
          margin-right: 10px;
          font-size: 22px;
        }

        &:last-child {
          color: #999;
          text-decoration: line-through;
          font-size: 16px;
        }
      }
    }

    .service {
      background: #f5f5f5;
      margin-top: 10px;
      padding: 20px 10px 0;

      dl {
        padding-bottom: 20px;
        display: flex;
        align-items: center;

        dt {
          color: #999;
          margin-right: 10px;
        }

        dd {
          color: #666;

          span {
            margin-right: 10px;

            &::before {
              content: '•';
              color: $xtxColor;
              margin-right: 5px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }
}

.goods-footer {
  margin-top: 20px;
  min-height: 600px;
  background: #fff;
  padding: 0 40px;

  nav {
    font-size: 18px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
  }

  .goods-detail {
    padding: 40px 0;

    .attrs {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30px;

      li {
        width: 50%;
        margin-bottom: 10px;

        .attr-name {
          display: inline-block;
          width: 100px;
          color: #999;
        }

        .attr-value {
          color: #666;
        }
      }
    }

    .img-container {
      text-align: center;

      .el-image {
        width: 750px;
      }
    }
  }
}

.btn {
  margin-top: 15px;
}
</style>
