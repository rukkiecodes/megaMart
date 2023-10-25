// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Signup",
        component: () => import("@/views/Signup.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
    ],
  },
  {
    path: "/app",
    name: "app",
    component: () => import("@/layouts/app/Navigation.vue"),

    children: [
      {
        path: "",
        name: "app.products",
        component: () => import("@/views/Products/Productvue.vue"),

        children: [
          {
            path: "",
            component: () => import("@/views/Products/Products.vue"),
          },
          {
            path: ":id",
            component: () => import("@/views/Products/Product.vue"),
          },
        ],
      },
      {
        path: "profile",
        component: () => import("@/views/profile/Profile.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/profile/Me.vue"),
          },
          {
            path: "me",
            component: () => import("@/views/profile/Me.vue"),
          },
          {
            path: ":profile",
            component: () => import("@/views/profile/Order.vue"),
          },
        ],
      },
      {
        path: "cart",
        name: "app.cart",
        component: () => import("@/views/Cart.vue"),
      },
      {
        path: "sell",
        name: "app.sell",
        component: () => import("@/views/Sell.vue"),
      },
      {
        path: "checkout",
        name: "app.checkout",
        component: () => import("@/views/Checkout.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
