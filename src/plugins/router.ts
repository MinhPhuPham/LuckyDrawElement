import router from '@/router'
import { App } from 'vue'

export default {
  install: (app: App) => {
    const goto = (name: string, params?: Record<string, string>) => {
      const nextRouter = router.getRoutes()?.find((router) => router.name === name)
      const currentParams = router.currentRoute?.value?.params || {}
      // Remove useless param
      for (const paramkey of Object.keys(currentParams)) {
        if ((nextRouter?.path.indexOf(`:${paramkey}`) || -1) < 0) {
          delete currentParams[paramkey]
        }
      }

      router.push({
        name,
        params: {
          ...currentParams,
          ...params,
        },
      })
    }

    app.config.globalProperties.$goto = goto
    app.provide('goto', goto)
  },
}
