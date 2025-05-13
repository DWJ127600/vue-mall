import APIClient from '@/services/api-client'
import { ref } from 'vue'

interface OrderOption {
  deliveryTimeType: number
  payType: number
  payChannel: number
  buyerMessage: string
  goods: {
    skuId: string
    count: number
  }[]
  addressId: string
}

const apiClient = new APIClient<{ id: string }>('/member/order')

const useOrderId = () => {
  const orderId = ref<string>('')

  const getOrderId = async (orderOption: OrderOption) => {
    const data = await apiClient.post(orderOption)
    orderId.value = data.result.id
  }

  return { orderId, getOrderId }
}

export default useOrderId
