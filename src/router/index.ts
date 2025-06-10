import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useUserSessionStore } from '@/stores/userSessionStore'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
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
    path: '/profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true, roles: ['user', 'admin'] }
  },
  {
    path: '/counterpick',
    component: () => import('@/views/CounterPickView.vue'),
    meta: { public: true }
  },
  {
    path: '/rotation',
    component: () => import('@/views/RotationView.vue'),
    meta: {public: true}
  },
  {
    path: '/items',
    component: () => import('@/views/ItemBuildView.vue')
  },
  {
    path: '/server-status',
    component: () => import('@/views/ServerStatusView.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminView.vue'),
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      { path: '', redirect: '/admin/rotation' },
      {
        path: 'rotation',
        component: () => import('@/views/admin/RotationTab.vue')
      },
      {
        path: 'stats',
        component: () => import('@/views/admin/StatsTab.vue')
      },
      {
        path: 'users',
        component: () => import('@/views/admin/UsersTab.vue')
      },
      {
        path: 'notifications',
        component: () => import('@/views/admin/NotificationsTab.vue')
      },
      {
        path: 'logs',
        component: () => import('@/views/admin/LogsTab.vue')
      }
    ]
  },
  {
    path: '/champions',
    component: () => import('@/views/CounterPickView.vue'),
    meta: { public: true }
  },
  {
    path: '/notifications',
    component: () => import('@/views/NotificationListView.vue'),
    meta: { public: true }
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
  const store = useUserSessionStore()
  const isGuest = !store.token
  const isAdmin = store.user?.is_admin === true
  const userRole = isAdmin ? 'admin' : 'user'

  if (to.meta.guestOnly && !isGuest) {
    return next('/dashboard')
  }

  if (to.meta.public) return next()

  if (to.meta.requiresAuth && isGuest) {
    return next('/login')
  }

  if (to.meta.requiresAuth && to.meta.roles) {
    const allowed = to.meta.roles as string[]
    if (!allowed.includes(userRole)) {
      return next('/dashboard')
    }
  }

  next()
})

export default router
