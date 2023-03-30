<template>
  <v-app-bar flat>
    <v-app-bar-title class="font-weight-bold">MegaMart </v-app-bar-title>
    <v-spacer />

    <v-chip color="blue" to="/app/profile">
      <v-icon class="mr-2">mdi-account</v-icon>

      <span>{{ profile.user?.name }}</span>
    </v-chip>
    <v-btn class="bg-blue ml-2" rounded="lg">Sell</v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import { useProfileStore } from "@/store/app/profile/getProfile";

const profile = ref(useProfileStore())
</script>