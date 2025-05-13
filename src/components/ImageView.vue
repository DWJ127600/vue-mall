<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="left-image" ref="target">
      <el-image :src="imageList[activeIndex]" />
      <!-- 放大镜大图 -->
      <div
        class="layer"
        :style="{
          backgroundImage: `url(${imageList[activeIndex]})`,
          backgroundPositionX: `${positionX}px`,
          backgroundPositionY: `${positionY}px`,
        }"
        v-show="!isOutside"
      ></div>
    </div>
    <!-- 右侧小图列表 -->
    <ul class="right-image-list">
      <li
        v-for="(img, index) in imageList"
        :key="index"
        @mouseenter="enterHandler(index)"
        :class="{ active: index === activeIndex }"
      >
        <el-image :src="img" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import { ref, watch } from 'vue'

interface Props {
  imageList: string[]
}

withDefaults(defineProps<Props>(), {
  imageList: () => [],
})

const activeIndex = ref(0)
const enterHandler = (index: number) => {
  activeIndex.value = index
}

const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)
const positionX = ref(0)
const positionY = ref(0)

watch([elementX, elementY, isOutside], () => {
  if (isOutside.value) return

  if (elementX.value > 110 && elementX.value < 330) {
    positionX.value = -(elementX.value - 110) * 2
  }
  if (elementY.value > 110 && elementY.value < 330) {
    positionY.value = -(elementY.value - 110) * 2
  }

  if (elementX.value < 110) positionX.value = 0
  else if (elementX.value > 330) positionX.value = -440

  if (elementY.value < 110) positionY.value = 0
  else if (elementY.value > 330) positionY.value = -440
})
</script>

<style scoped lang="scss">
.goods-image {
  display: flex;
  align-items: start;

  .left-image {
    background: #f5f5f5;
    position: relative;

    .el-image {
      width: 440px;
      height: 440px;
    }

    .layer {
      width: 100%;
      height: 100%;
      background-color: black;
      position: absolute;
      left: 0;
      top: 0;
      background-size: 880px 880px;
      background-repeat: no-repeat;
    }
  }

  .right-image-list {
    margin-left: 12px;
    width: 88px;

    li {
      margin-bottom: 10px;
      border: 2px solid transparent;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
