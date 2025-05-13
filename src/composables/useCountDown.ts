import dayjs from 'dayjs'
import { ref, computed, onUnmounted } from 'vue'

const useCountDown = () => {
  let timer: number | null = null
  const time = ref(0)
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))

  const start = (currentTime: number) => {
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }

  onUnmounted(() => {
    if (timer !== null) {
      clearInterval(timer)
    }
  })

  return { formatTime, start }
}

export default useCountDown
