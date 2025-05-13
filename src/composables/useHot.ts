import APIClient from '@/services/api-client'
import { onMounted, ref } from 'vue'

export interface Hot {
  id: string
  picture: string
  title: string
  alt: string
}

const apiClient = new APIClient<Hot>('/home/hot')

const useHot = () => {
  const hotList = ref<Hot[]>([])

  onMounted(async () => {
    const data = await apiClient.getAll()
    hotList.value = data.result
  })

  return { hotList }
}

export default useHot
