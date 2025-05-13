import APIClient from '@/services/api-client'
import useCartStore from '@/stores/cartStore'
import { ref } from 'vue'
import useUserCart from './useUserCart'

export interface UserInfo {
  id: string
  account: string
  token: string
  avatar: string
}

interface LoginInfo {
  account: string
  password: string
}

const apiClient = new APIClient<UserInfo>('/login')

const useLogin = () => {
  const userInfo = ref<UserInfo>({} as UserInfo)
  const cartStore = useCartStore()
  const { mergeUserCart } = useUserCart()

  const getUserInfo = async (loginInfo: LoginInfo) => {
    const data = await apiClient.post(loginInfo)
    userInfo.value = data.result

    await mergeUserCart(
      cartStore.cartList.map((item) => ({
        skuId: item.skuId,
        count: item.count,
        selected: item.selected === true ? 'true' : 'false',
      })),
    )

    cartStore.getNewCartList()
  }

  return { userInfo, getUserInfo }
}

export default useLogin
