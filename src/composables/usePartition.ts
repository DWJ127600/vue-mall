import APIClient from '@/services/api-client'
import { onMounted, ref } from 'vue'
import type { Goods } from './useCategory'

export interface Partition {
  id: string
  name: string
  picture: string
  saleInfo: string
  goods: Goods[]
}

const apiClient = new APIClient<Partition>('/home/goods')

const usePartition = () => {
  const partitionList = ref<Partition[]>([])

  onMounted(async () => {
    const data = await apiClient.getAll()
    partitionList.value = data.result
  })

  return { partitionList }
}

export default usePartition
