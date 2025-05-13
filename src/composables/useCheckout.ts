import APIClient from '@/services/api-client'
import { onMounted, ref } from 'vue'

export interface UserAddress {
  id: string
  receiver: string
  contact: string
  address: string
  fullLocation: string
  isDefault: number
}

interface CheckInfo {
  userAddresses: UserAddress[]
  goods: {
    id: string
    name: string
    picture: string
    count: number
    skuId: string
    attrsText: string
    price: string
    totalPrice: string
    totalPayPrice: string
  }[]
  summary: {
    goodsCount: number
    totalPrice: number
    totalPayPrice: number
    postFee: number
  }
}

const apiClient = new APIClient<CheckInfo>('/member/order/pre')

const useCheckout = () => {
  const checkInfo = ref<CheckInfo>({} as CheckInfo)
  const defaultAddress = ref<UserAddress>({} as UserAddress)

  onMounted(async () => {
    const data = await apiClient.get()
    checkInfo.value = data.result
    defaultAddress.value =
      checkInfo.value.userAddresses.find((item) => item.isDefault === 0) || ({} as UserAddress)
  })

  return { checkInfo, defaultAddress }
}

export default useCheckout
