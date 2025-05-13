import APIClient from '@/services/api-client'
import { onMounted, ref } from 'vue'
import useCountDown from './useCountDown'

interface PayInfo {
  payMoney: number
  countdown: number
}

const usePay = (id: string) => {
  const apiClient = new APIClient<PayInfo>(`/member/order/${id}`)
  const payInfo = ref<PayInfo>({} as PayInfo)
  const { formatTime, start } = useCountDown()

  onMounted(async () => {
    const data = await apiClient.get()
    payInfo.value = data.result
    start(payInfo.value.countdown)
  })

  return { payInfo, formatTime }
}

export default usePay
