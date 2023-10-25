<template>
  <v-container>
    <v-card width="400" max-width="100%" class="mx-auto" rounded="xl">
      <v-card-title><p class="text-center">Sign Up</p></v-card-title>

      <p class="text-center">Please fill the form to create your account</p>

      <v-card-text>
        <v-text-field
          label="Your Name"
          variant="underlined"
          color="blue"
          prepend-inner-icon=" mdi-account"
          v-model="signup.name"
        />

        <v-text-field
          label="Your Email"
          variant="underlined"
          color="blue"
          prepend-inner-icon="mdi-email"
          v-model="signup.email"
          />
          <v-text-field
          label="Create Password"
          variant="underlined"
          color="blue"
          prepend-inner-icon="mdi-lock"
          append-inner-icon="mdi-eye-off"
          v-model="signup.password"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          class="bg-blue text-white"
          rounded="pill"
          @click="signup.createUser"
          :loading="signup.loading"
          >SIGN UP</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { useSignupStore } from "@/store/signup";
const signup = useSignupStore();
</script>
