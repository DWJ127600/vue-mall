import APIClient from '@/services/api-client'
import type { Goods } from './useCategory'
import { ref, onMounted } from 'vue'

interface SubCategoryGoods {
  items: Goods[]
}

export interface PageInfo {
  categoryId: string
  page: number
  pageSize: number
  sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
}

export const apiClient = new APIClient<SubCategoryGoods>('/category/goods/temporary')

const useSubCategoryGoods = (pageInfo: PageInfo) => {
  const goodsList = ref<Goods[]>([])

  onMounted(async () => {
    const data = await apiClient.post(pageInfo)
    goodsList.value = data.result.items
  })

  return { goodsList }
}

export default useSubCategoryGoods
