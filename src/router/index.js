// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'signin',
        component: () => import('@/views/auth/SignIn.vue'),
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/auth/SignUp.vue'),
      },
    ],
  },
  {
    path: '/app',
    component: () => import('@/layouts/app/Default.vue'),
    children: [
      {
        path: '',
        name: 'app',
        component: () => import('@/views/app/Home.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
