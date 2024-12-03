import { createRouter, createWebHistory } from 'vue-router'
import { useBookStore } from '../store'
import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHistory(),
})

// redirect to home if no book
router.beforeEach((to, _from, next) => {
  const bookStore = useBookStore()
  if (to.path === '/book' && !bookStore.existBook()) {
    next({ name: 'home' })
  }
  else {
    next()
  }
})

export default router