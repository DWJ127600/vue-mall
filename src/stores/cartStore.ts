import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import useUserStore from './userStore'
import useUserCart from '@/composables/useUserCart'
import { updateAllCart, updateCart } from '@/services/api-client'

export interface Cart {
  id: string
  name: string
  picture: string
  count: number
  skuId: string
  price: string
  attrsText: string
  selected: boolean
}

const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref<Cart[]>([])

    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    const { getUserCartList, addUserCart, deleteUserCart } = useUserCart()

    const getNewCartList = async () => {
      cartList.value = await getUserCartList()
    }
    const addCart = async (cart: Cart) => {
      if (isLogin.value) {
        await addUserCart(cart)
        getNewCartList()
      } else {
        const findCart = cartList.value.find((item) => item.skuId === cart.skuId)
        if (findCart) findCart.count += cart.count
        else cartList.value.unshift(cart)
      }
    }
    const deleteCart = async (skuId: string) => {
      if (isLogin.value) {
        await deleteUserCart([skuId])
        getNewCartList()
      } else {
        const findCartIndex = cartList.value.findIndex((item) => item.skuId === skuId)
        cartList.value.splice(findCartIndex, 1)
      }
    }
    const clearAllCart = () => {
      cartList.value = []
    }
    // 乐观更新
    const updateUserCart = (cart: Cart) => {
      const { skuId, count, selected } = cart
      if (isLogin.value) {
        updateCart(skuId, { count, selected })
      }
    }
    const checkAll = (ids: string[], selected: boolean) => {
      cartList.value.forEach((item) => (item.selected = selected))
      if (isLogin.value) {
        updateAllCart({ ids, selected })
      }
    }

    const allCount = computed(() => cartList.value.reduce((count, cart) => count + cart.count, 0))
    const allPrice = computed(() =>
      cartList.value.reduce((price, cart) => price + parseFloat(cart.price) * cart.count, 0),
    )
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((count, cart) => count + cart.count, 0),
    )
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((price, cart) => price + parseFloat(cart.price) * cart.count, 0),
    )

    return {
      cartList,
      getNewCartList,
      addCart,
      deleteCart,
      clearAllCart,
      updateUserCart,
      checkAll,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
    }
  },
  {
    persist: true,
  },
)

export default useCartStore
