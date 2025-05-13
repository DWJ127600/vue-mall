import type { App } from 'vue'
import ImageView from '@/components/ImageView.vue'
import Sku from '@/components/Sku/Index.vue'

export default {
  install(app: App) {
    app.component('ImageView', ImageView)
    app.component('Sku', Sku)
  },
}
