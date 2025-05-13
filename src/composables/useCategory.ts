import APIClient from '@/services/api-client'
import { onMounted, ref } from 'vue'

export interface Goods {
  id: string
  name: string
  desc: string
  price: string
  picture: string
}

interface Category {
  id: string
  name: string
  children: Category[]
  goods: Goods[]
}

const apiClient = new APIClient<Category>('/home/category/head')

const useCategory = () => {
  const categoryList = ref<Category[]>([])

  onMounted(async () => {
    const data = await apiClient.getAll()
    categoryList.value = data.result
  })

  return { categoryList }
}

export default useCategory
