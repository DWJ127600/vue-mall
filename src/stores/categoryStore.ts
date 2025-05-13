import useCategory from '@/composables/useCategory'
import { defineStore } from 'pinia'

const useCategoryStore = defineStore('category', () => {
  const { categoryList } = useCategory()

  return { categoryList }
})

export default useCategoryStore
