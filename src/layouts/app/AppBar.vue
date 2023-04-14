<template>
  <v-app-bar flat>
    <v-app-bar-title class="font-weight-bold">MegaMart </v-app-bar-title>
    <v-spacer />

    <v-chip color="blue" to="/app/profile">
      <v-icon class="mr-2">mdi-account</v-icon>

      <span>{{ profile.user?.name }}</span>
    </v-chip>

    <v-btn icon class="mx-4" to="/app/cart">
      <v-badge color="amber-darken-4" :content="cart.cart.length">
        <v-icon icon="mdi-cart-outline" color="blue"></v-icon>
      </v-badge>
    </v-btn>

    <v-btn to="/app/sell" class="bg-blue ml-2" rounded="lg">Sell</v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import { useProfileStore } from "@/store/app/profile/getProfile";
import { useCartStore } from "@/store/app/cart";

const profile = ref(useProfileStore())
const cart = useCartStore()
</script>