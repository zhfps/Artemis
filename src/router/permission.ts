import router from './index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const token = sessionStorage.getItem('token')
  if(to.name == 'Login')  {
    next()
  }
  else if(to.name != 'Login' && token ){
    next()
  } else {
    next({path: '/login'})
  }

//   document.title = to.meta.title as string
})

router.afterEach(() => {
  NProgress.done()
})