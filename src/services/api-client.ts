import type { CartInfo } from '@/composables/useUserCart'
import useUserStore from '@/stores/userStore'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { useRouter } from 'vue-router'

interface FetchAllResponse<T> {
  result: T[]
}

interface FetchResponse<T> {
  result: T
}

export interface MergeCartInfo extends CartInfo {
  selected: string
}

export interface UpdateInfo {
  count: number
  selected: boolean
}

export interface UpdateAllInfo {
  ids: string[]
  selected: boolean
}

const axiosInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e),
)

axiosInstance.interceptors.response.use(null, (e: AxiosError) => {
  const userStore = useUserStore()
  const router = useRouter()
  if (e.response?.status === 401) {
    userStore.clearUserInfo()
    router.push('/login')
  }

  return Promise.reject(e)
})

class APIClient<T> {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance.get<FetchAllResponse<T>>(this.endpoint, config).then((res) => res.data)

  get = (config?: AxiosRequestConfig) =>
    axiosInstance.get<FetchResponse<T>>(this.endpoint, config).then((res) => res.data)

  // getSubCategoryGoods = (pageInfo: PageInfo) =>
  //   axiosInstance.post<FetchResponse<T>>(this.endpoint, pageInfo).then((res) => res.data)

  // login = (loginInfo: LoginInfo) =>
  //   axiosInstance.post<FetchResponse<T>>(this.endpoint, loginInfo).then((res) => res.data)

  // addCart = (cartInfo: CartInfo) =>
  //   axiosInstance.post<FetchResponse<T>>(this.endpoint, cartInfo).then((res) => res.data)

  post = <D>(body: D) =>
    axiosInstance.post<FetchResponse<T>>(this.endpoint, body).then((res) => res.data)
}

export const deleteCart = (ids: string[]) => axiosInstance.delete('/member/cart', { data: { ids } })

export const mergeCart = (mergeCartInfo: MergeCartInfo[]) =>
  axiosInstance.post('/member/cart/merge', mergeCartInfo)

export const updateCart = (skuId: string, updateInfo: UpdateInfo) =>
  axiosInstance.put(`/member/cart/${skuId}`, updateInfo)

export const updateAllCart = (updateAllInfo: UpdateAllInfo) =>
  axiosInstance.put('/member/cart/selected', updateAllInfo)

export default APIClient
