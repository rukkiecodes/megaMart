<template>
  <v-container>
    <v-card width="400" max-width="100%" class="mx-auto" rounded="xl">
      <v-card-title>
        <p class="text-center">Login</p>
      </v-card-title>
      <p class="text-center">
        Welcome back please fill the form to access your account
      </p>

      <v-card-text>
        <v-text-field
          label="Your Email"
          variant="underlined"
          color="blue"
          prepend-inner-icon="mdi-email"
          v-model="login.email"
        />

        <v-text-field
          label="Your Password"
          variant="underlined"
          color="blue"
          prepend-inner-icon="mdi-lock"
          append-inner-icon="mdi mdi-eye-off"
          v-model="login.password"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn block class="bg-blue text-white" rounded="pill" @click="login.logInUser">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { useLoginStore } from "@/store/login";

const login = useLoginStore();
</script>