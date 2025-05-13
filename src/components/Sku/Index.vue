<template>
  <div class="goods-sku">
    <dl v-for="item in goodsSku.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="clickSpecs(item, val)"
            v-if="val.picture"
            :src="val.picture"
            :alt="val.name"
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="clickSpecs(item, val)"
            v-else
          >
            {{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import bwPowerSet from './power-set.ts'

const spliter = '★'

interface SpecValue {
  name: string
  picture?: string
  selected?: boolean
  disabled?: boolean
}

interface Spec {
  id: string
  name: string
  values: SpecValue[]
}

interface SkuSpec {
  name: string
  valueName: string
}

interface Sku {
  id: string
  inventory: number
  price: string
  oldPrice: string
  specs: SkuSpec[]
}

interface GoodsSku {
  specs: Spec[]
  skus: Sku[]
}

export interface EmitData {
  skuId?: string
  price?: string
  oldPrice?: string
  inventory?: number
  specsText?: string
}

const props = defineProps<{
  goodsSku: GoodsSku
}>()

const emit = defineEmits<{
  (e: 'change', payload: EmitData): void
}>()

// 根据skus数据得到路径字典对象
const getPathMap = (skus: Sku[]): Record<string, string[]> => {
  const pathMap: Record<string, string[]> = {}
  if (skus && skus.length > 0) {
    skus.forEach((sku) => {
      if (sku.inventory) {
        const specs = sku.specs.map((spec) => spec.valueName)
        const powerSet = bwPowerSet(specs)
        powerSet.forEach((set) => {
          const key = set.join(spliter)
          if (!pathMap[key]) {
            pathMap[key] = []
          }
          pathMap[key].push(sku.id)
        })
      }
    })
  }
  return pathMap
}

// 初始化禁用状态
const initDisabledStatus = (specs: Spec[], pathMap: Record<string, string[]>) => {
  if (specs && specs.length > 0) {
    specs.forEach((spec) => {
      spec.values.forEach((val) => {
        val.disabled = !pathMap[val.name]
      })
    })
  }
}

// 得到当前选中规格集合
const getSelectedArr = (specs: Spec[]): (string | undefined)[] => {
  const selectedArr: (string | undefined)[] = []
  specs.forEach((spec, index) => {
    const selectedVal = spec.values.find((val) => val.selected)
    selectedArr[index] = selectedVal ? selectedVal.name : undefined
  })
  return selectedArr
}

// 更新按钮的禁用状态
const updateDisabledStatus = (specs: Spec[], pathMap: Record<string, string[]>) => {
  specs.forEach((item, i) => {
    const selectedArr = getSelectedArr(specs)
    item.values.forEach((val) => {
      if (!val.selected) {
        selectedArr[i] = val.name
        const key = selectedArr.filter((value) => value).join(spliter)
        val.disabled = !pathMap[key]
      }
    })
  })
}

let pathMap: Record<string, string[]> = {}

watchEffect(() => {
  pathMap = getPathMap(props.goodsSku.skus)
  initDisabledStatus(props.goodsSku.specs, pathMap)
})

const clickSpecs = (item: Spec, val: SpecValue) => {
  if (val.disabled) return false

  if (val.selected) {
    val.selected = false
  } else {
    item.values.forEach((bv) => {
      bv.selected = false
    })
    val.selected = true
  }

  updateDisabledStatus(props.goodsSku.specs, pathMap)

  const selectedArr = getSelectedArr(props.goodsSku.specs).filter((value) => value)
  if (selectedArr.length === props.goodsSku.specs.length) {
    const skuId = pathMap[selectedArr.join(spliter)][0]
    const sku = props.goodsSku.skus.find((sku) => sku.id === skuId)
    if (sku) {
      emit('change', {
        skuId: sku.id,
        price: sku.price,
        oldPrice: sku.oldPrice,
        inventory: sku.inventory,
        specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').trim(),
      })
    }
  } else {
    emit('change', {})
  }
}
</script>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: $xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  margin-top: 15px;

  dl {
    display: flex;
    padding-bottom: 15px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
