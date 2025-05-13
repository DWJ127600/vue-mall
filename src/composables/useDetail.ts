import APIClient from '@/services/api-client'
import { onMounted, ref } from 'vue'

interface Detail {
  id: string
  name: string
  desc: string
  price: string
  oldPrice: string
  salesCount: number
  commentCount: number
  collectCount: number
  mainPictures: string[]
  brand: {
    name: string
  }
  categories: {
    id: string
    name: string
  }[]
  details: {
    pictures: string[]
    properties: {
      name: string
      value: string
    }[]
  }
  specs: {
    id: string
    name: string
    values: {
      name: string
      pictures?: string
    }[]
  }[]
  skus: {
    id: string
    price: string
    oldPrice: string
    inventory: number
    specs: {
      name: string
      valueName: string
    }[]
  }[]
}

const apiClient = new APIClient<Detail>('/goods')

const useDetail = (id: string) => {
  const detail = ref<Detail>({} as Detail)

  onMounted(async () => {
    const data = await apiClient.get({ params: { id } })
    detail.value = data.result
  })

  return { detail }
}

export default useDetail
