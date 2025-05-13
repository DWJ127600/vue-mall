import useLogin, { type UserInfo } from '@/composables/useLogin'
import { defineStore } from 'pinia'

const useUserStore = defineStore(
  'user',
  () => {
    const { userInfo, getUserInfo } = useLogin()

    const clearUserInfo = () => (userInfo.value = {} as UserInfo)

    return { userInfo, getUserInfo, clearUserInfo }
  },
  { persist: true },
)

export default useUserStore
