// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Signin',
        component: () => import('@/views/auth/SignIn.vue'),
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/auth/SignUp.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
