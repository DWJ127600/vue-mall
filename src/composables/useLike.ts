import APIClient from '@/services/api-client'
import type { Goods } from './useCategory'
import { onMounted, ref } from 'vue'

const apiClient = new APIClient<Goods>('/goods/relevant')

const useLikey = () => {
  const likeList = ref<Goods[]>([])

  onMounted(async () => {
    const data = await apiClient.getAll()
    likeList.value = data.result
  })

  return { likeList }
}

export default useLikey
