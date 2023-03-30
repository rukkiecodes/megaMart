<template>
  <v-app>
    <default-bar />
    <Drawer />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue'
import Drawer from './Drawer.vue'
</script>
