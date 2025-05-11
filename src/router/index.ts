import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from '@/stores/userStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginView,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true, roles: ['user', 'admin'] }
  },
  {
    path: '/reset-password',
    component: () => import('@/views/ResetPasswordView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()

  // Jeszcze nie zalogowany – gość
  const isGuest = !store.token

  // Jeśli tylko dla niezalogowanych
  if (to.meta.guestOnly && !isGuest) {
    return next('/dashboard')
  }

  // Jeśli wymaga logowania
  if (to.meta.requiresAuth && isGuest) {
    return next('/login')
  }

  // Jeśli są wymagane role
  if (to.meta.requiresAuth && to.meta.roles) {
    const roles = to.meta.roles as string[]
    if (!roles.includes(store.user?.role || '')) {
      return next('/dashboard')
    }
  }

  next()
})

export default router
