<template>
  <v-app>
    <v-app-bar flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-lg-and-up" />
      <v-app-bar-title class="font-weight-bold">
        <v-text-field
          placeholder="Search Products"
          density="compact"
          variant="solo"
          rounded="lg"
          class="mt-6"
        ></v-text-field>
      </v-app-bar-title>
      <v-spacer class="hidden-sm-and-down" />
      <v-chip to="/app/profile" class="hidden-sm-and-down" color="blue">
        <v-avatar>
          <v-icon icon="mdi-account" color="blue"></v-icon>
        </v-avatar>
        {{ profile.user?.name }}
      </v-chip>
      <v-btn icon size="small" class="mx-2" to="/app/cart">
        <v-badge :content="cart.cart.length">
          <v-icon icon="mdi-cart-outline" size="x-large"></v-icon>
        </v-badge>
      </v-btn>
      <v-btn class="bg-blue" rounded="lg" to="/app/sell">Sell</v-btn>
    </v-app-bar>

    <v-navigation-drawer :border="0" width="200" v-model="drawer">
      <v-list>
        <v-list-item
          class="ma-2"
          density="compact"
          rounded="lg"
          color="blue"
          v-for="(item, index) in routes"
          :key="index"
          :title="item.name"
          :to="item.to"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { useProfileStore } from "@/store/profile";
import { useSellStore } from "@/store/sell";
import { useCartStore } from "@/store/cart";
import { useDisplay } from "vuetify";
import { computed, ref } from "vue";
import { useAppStore } from "@/store/app";
import { useShoplistingStore } from "@/store/shoppingList";

export default {
  data: () => ({
    routes: [
      {
        name: "Home",
        to: "/app",
      },
      {
        name: "Profile",
        to: "/app/profile",
      },
      {
        name: "Cart",
        to: "/app/cart",
      },
      {
        name: "Sell",
        to: "/app/sell",
      },
    ],
  }),

  setup() {
    const profile = useProfileStore();
    const sell = useSellStore();
    const cart = useCartStore();
    const shoppingList = useShoplistingStore();
    const drawer = ref(false);

    const { name } = useDisplay();

    const resetDrawer = () => {
      switch (name.value) {
        case "xs":
          return (drawer.value = false);
        case "sm":
          return (drawer.value = false);
        case "md":
          return (drawer.value = false);
        case "lg":
          return (drawer.value = true);
        case "xl":
          return (drawer.value = true);
        case "xxl":
          return (drawer.value = true);
      }
    };

    return {
      profile,
      sell,
      cart,
      drawer,
      resetDrawer,
      shoppingList
    };
  },

  mounted() {
    this.profile.getProfile();
    this.sell.getItems();
    this.cart.getCart();
    this.shoppingList.userAds();
    this.resetDrawer();
  },
};
</script>
