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
        component: () => import('@/views/app/home/Home.vue'),
      },
      {
        path: 'products',
        name: 'app.home',
        component: () => import('@/views/app/home/Home.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/app/home/Products.vue')
          },
          {
            path: ':product',
            component: () => import('@/views/app/home/Product.vue'),
          },
        ]
      },
      {
        path: 'profile',
        name: 'app.profile',
        component: () => import('@/views/app/profile/Profile.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/app/profile/Me.vue')
          },
          {
            path: 'me',
            component: () => import('@/views/app/profile/Me.vue')
          },
          {
            path: ':profile',
            component: () => import('@/views/app/profile/Other.vue')
          }
        ]
      },
      {
        path: 'sell',
        name: 'app.sell',
        component: () => import('@/views/app/Sell.vue'),
      },
      {
        path: 'cart',
        name: 'app.cart',
        component: () => import('@/views/app/Cart.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
