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
import { onMounted } from 'vue';
import { useProfileStore } from '@/store/app/profile/getProfile';

const profile = useProfileStore()

onMounted(() => {
  profile.getUserProfile()
})
</script>
