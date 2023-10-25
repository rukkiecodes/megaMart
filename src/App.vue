<template>
  <router-view />

  <v-snackbar v-model="app.snackbar" :color="app.snackbarColor" location="top right">
    {{  app.snackbarText }}
  </v-snackbar>
</template>

<script setup>
import { useAppStore } from "./store/app";

const app = useAppStore()
</script>

<style scoped>
* {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
