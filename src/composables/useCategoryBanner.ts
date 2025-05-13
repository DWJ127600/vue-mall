import APIClient from '@/services/api-client'
import { ref, onMounted } from 'vue'
import type { Banner } from './useHomePageBanner'

const apiClient = new APIClient<Banner>('/home/banner')

const useCategoryBanner = () => {
  const bannerList = ref<Banner[]>([])

  onMounted(async () => {
    const data = await apiClient.getAll({ params: { distributionSite: '2' } })
    bannerList.value = data.result
  })

  return { bannerList }
}

export default useCategoryBanner
