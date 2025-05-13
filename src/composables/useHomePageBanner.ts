import APIClient from '@/services/api-client'
import { ref, onMounted } from 'vue'

export interface Banner {
  id: string
  imgUrl: string
  hrefUrl: string
}

const apiClient = new APIClient<Banner>('/home/banner')

const useHomePageBanner = () => {
  const bannerList = ref<Banner[]>([])

  onMounted(async () => {
    const data = await apiClient.getAll()
    bannerList.value = data.result
  })

  return { bannerList }
}

export default useHomePageBanner
