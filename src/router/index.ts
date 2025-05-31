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
    path: '/reset-password',
    component: () => import('@/views/ResetPasswordView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true, roles: ['user', 'admin'] }
  },
  {
    path: '/admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/champions',
    component: () => import('@/views/ChampionListView.vue'),
    meta: { public: true }
  },
  {
    path: '/notifications',
    component: () => import('@/views/NotificationListView.vue'),
    meta: { public: true }
  },
  {
    path: '/profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true, roles: ['user', 'admin'] }
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
  const isGuest = !store.token
  const userRole = store.user?.role || ''

  if (to.meta.guestOnly && !isGuest) {
    if (to.path !== '/dashboard') return next('/dashboard')
    return next()
  }

  if (to.meta.public) return next()

  if (to.meta.requiresAuth && isGuest) {
    if (to.path !== '/login') return next('/login')
    return next()
  }

  if (to.meta.requiresAuth && to.meta.roles) {
    const roles = to.meta.roles as string[]
    if (!roles.includes(userRole)) {
      if (to.path !== '/dashboard') return next('/dashboard')
      return next()
    }
  }

  next()
})


export default router
