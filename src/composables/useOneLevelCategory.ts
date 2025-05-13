import APIClient from '@/services/api-client'
import { onMounted, ref } from 'vue'
import type { Goods } from './useCategory'

interface Children {
  id: string
  name: string
  picture: string
  goods: Goods[]
}

export interface OneLevelCategory {
  name: string
  children: Children[]
}

const apiClient = new APIClient<OneLevelCategory>('/category')

const useOneLevelCategory = (id: string) => {
  const categoryList = ref<OneLevelCategory>({} as OneLevelCategory)

  onMounted(async () => {
    const data = await apiClient.get({ params: { id } })
    categoryList.value = data.result
  })

  return { categoryList }
}

export default useOneLevelCategory
