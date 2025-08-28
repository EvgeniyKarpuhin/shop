import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Shop from '@/views/Shop.vue'
import Cart from '@/views/Cart.vue'
import { useAuthStore } from '@/stores/authorization'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/shop' },
    { path: '/login', component: Login, meta: { public: true } },
    { path: '/', component: Shop },
    { path: '/', component: Cart },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if(!to.meta.public && !auth.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router
