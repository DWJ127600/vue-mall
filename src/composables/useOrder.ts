import APIClient from '@/services/api-client'
import { ref, onMounted } from 'vue'

export interface OrderParams {
  orderState: number
  page: number
  pageSize: number
}

interface OrderItems {
  id: string
  createTime: string
  orderState: number
  countdown: number
  payMoney: number
  postFee: number
  skus: {
    id: string
    name: string
    quantity: number
    image: string
    realPay: number
    attrsText: string
  }[]
}

interface OrderInfo {
  counts: number
  items: OrderItems[]
}

const apiClient = new APIClient<OrderInfo>('/member/order')

const useOrder = (params: OrderParams) => {
  const orderList = ref<OrderItems[]>([])
  const total = ref(0)

  const getOrderList = async (params: OrderParams) => {
    const data = await apiClient.get({ params })
    orderList.value = data.result.items
    total.value = data.result.counts
  }

  onMounted(async () => {
    const data = await apiClient.get({ params })
    orderList.value = data.result.items
    total.value = data.result.counts
  })

  return { orderList, total, getOrderList }
}

export default useOrder
