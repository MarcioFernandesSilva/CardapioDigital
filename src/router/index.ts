import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      beforeEnter: (to, from, next) => {
        // Se já está logado, redirecionar para admin
        const adminStore = useAdminStore()
        if (adminStore.isAdmin) {
          next('/admin')
        } else {
          next()
        }
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      beforeEnter: (to, from, next) => {
        // Proteção da rota admin
        const adminStore = useAdminStore()
        if (!adminStore.isAdmin) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ]
})

// Middleware global de segurança
router.beforeEach((to, from, next) => {
  // Proteção contra ataques de redirecionamento
  if (to.query.redirect) {
    const redirect = to.query.redirect as string
    if (redirect.startsWith('http') || redirect.startsWith('//')) {
      console.warn('Tentativa de redirecionamento malicioso detectada')
      next('/')
      return
    }
  }
  
  // Log de navegação para auditoria
  console.log(`Navegação: ${from.path} -> ${to.path}`)
  
  next()
})

export default router
