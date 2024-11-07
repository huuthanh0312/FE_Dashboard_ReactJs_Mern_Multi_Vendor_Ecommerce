import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Congig NProgress
export const nProgressConfig = NProgress.configure({
  showSpinner: false,
  speed: 500,
  minimum: 0.2,
  trickleSpeed: 200
})
