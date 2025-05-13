import APIClient from '@/services/api-client'
import { onMounted, ref } from 'vue'

interface TwoLevelCategory {
  id: string
  name: string
  parentId: string
  parentName: string
}

const apiClient = new APIClient<TwoLevelCategory>('/category/sub/filter')

const useTwoLevelCategory = (id: string) => {
  const categoryList = ref<TwoLevelCategory>({} as TwoLevelCategory)

  onMounted(async () => {
    const data = await apiClient.get({ params: { id } })
    categoryList.value = data.result
  })

  return { categoryList }
}

export default useTwoLevelCategory
