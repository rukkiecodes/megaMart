<template>
  <router-view />

  <v-snackbar v-model="app.snackbar" :color="app.snackbarColor" location="top right">
    {{ app.snackbarText }}
  </v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "./store/app";

const app = ref(useAppStore());
</script>

<style>
* {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>