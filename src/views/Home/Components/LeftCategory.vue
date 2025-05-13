<template>
  <div class="left-category">
    <el-menu>
      <el-menu-item
        v-for="category in categoryList"
        :key="category.id"
        :index="category.id"
        :style="{ '--el-menu-item-height': `${500 / categoryList.length}px` }"
      >
        <el-space :size="5" spacer="|">
          <RouterLink to="/" v-for="item in category.children.slice(0, 3)" :key="item.id"
            >{{ item.name }}
          </RouterLink>
        </el-space>
        <div class="layer">
          <h4>分类推荐<small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="item in category.goods" :key="item.id" :index="category.id">
              <RouterLink :to="`/detail/${item.id}`">
                <el-image :src="item.picture" />
                <div class="info">
                  <p class="name ellipsis">
                    {{ item.name }}
                  </p>
                  <p class="desc ellipsis-2">{{ item.desc }}</p>
                  <p class="price"><i>¥</i>{{ item.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/stores/categoryStore'
import { storeToRefs } from 'pinia'

const categoryStore = useCategoryStore()
const { categoryList } = storeToRefs(categoryStore)
</script>

<style scoped lang="scss">
.left-category {
  position: absolute;
  z-index: 98;
  width: 250px;
  height: 500px;

  .el-menu {
    width: 250px;
    background-color: rgba(0, 0, 0, 0.8);

    .el-menu-item {
      padding: 0;
      position: static;

      .el-space {
        width: 100%;
        color: #fff;
        justify-content: center;

        a {
          color: #fff;
        }
      }

      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;
        cursor: default;

        h4 {
          font-size: 20px;
          line-height: 80px;
          font-weight: normal;
          color: #000;

          small {
            font-size: 16px;
            color: #666;
            margin-left: 10px;
          }
        }

        ul {
          display: grid;
          gap: 15px;
          grid-template-columns: 310px 310px 310px;
          grid-template-rows: 120px 120px 120px;

          li {
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            a {
              width: 100%;
              height: 100%;
              padding: 0 10px;
              display: flex;
              align-items: center;

              &:hover {
                background: #e3f9f4;
              }

              .el-image {
                width: 95px;
                height: 95px;
                flex-shrink: 0;
              }

              .info {
                margin-left: 10px;
                line-height: 25px;
                overflow: hidden;

                .name {
                  font-size: 16px;
                  color: #666;
                }

                .desc {
                  color: #999;
                }

                .price {
                  font-size: 22px;
                  color: $priceColor;

                  i {
                    font-size: 16px;
                    margin-right: 3px;
                  }
                }
              }
            }
          }
        }
      }

      &:hover {
        background-color: var(--el-color-primary);

        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
