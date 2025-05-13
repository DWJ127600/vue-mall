import APIClient, { type MergeCartInfo, deleteCart, mergeCart } from '@/services/api-client'
import type { Cart } from '@/stores/cartStore'

export interface CartInfo {
  skuId: string
  count: number
}

const apiClient = new APIClient<Cart>('/member/cart')

const useUserCart = () => {
  const getUserCartList = async () => {
    const data = await apiClient.getAll()
    return data.result
  }

  const addUserCart = async (cartInfo: CartInfo) => {
    await apiClient.post(cartInfo)
  }

  const deleteUserCart = async (ids: string[]) => {
    await deleteCart(ids)
  }

  const mergeUserCart = async (mergeCartInfo: MergeCartInfo[]) => {
    await mergeCart(mergeCartInfo)
  }

  return { getUserCartList, addUserCart, deleteUserCart, mergeUserCart }
}

export default useUserCart
