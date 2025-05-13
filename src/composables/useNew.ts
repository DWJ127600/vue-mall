import APIClient from '@/services/api-client'
import { onMounted, ref } from 'vue'

export interface New {
  id: string
  name: string
  price: string
  picture: string
}

const apiClient = new APIClient<New>('/home/new')

const useNew = () => {
  const newList = ref<New[]>([])

  onMounted(async () => {
    const data = await apiClient.getAll()
    newList.value = data.result
  })

  return { newList }
}

export default useNew
