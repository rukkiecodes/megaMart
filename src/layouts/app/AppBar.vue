<template>
  <v-app-bar flat>
    <v-app-bar-title class="font-weight-bold">MegaMart </v-app-bar-title>
    <v-spacer />

    <v-btn class="text-capitalize" :class="$route.path == '/' ? 'bg-blue' : ''" rounded="lg" to="/">Login</v-btn>
    <v-btn class="text-capitalize ml-2" :class="$route.path == '/signup' ? 'bg-blue' : ''" rounded="lg" to="/signup">Sign
      Up</v-btn>
  </v-app-bar>
</template>
