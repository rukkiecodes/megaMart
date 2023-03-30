<template>
  <v-container class="mt-16">
    <v-card rounded="xl" width="400" max-width="100%" class="mx-auto" elevation="5">
      <v-card-title class="text-center text-h5">Sign Up</v-card-title>
      <v-card-text class="text-center text-caption">Please fill the form to create your account</v-card-text>
      <v-card-text>
        <v-text-field v-model="signup.name" label="Your Name" type="email" variant="underlined" density="comfortable"
          prepend-inner-icon="mdi-account" color="blue" />
        <v-text-field v-model="signup.email" label="Your Email" type="email" variant="underlined" density="comfortable"
          prepend-inner-icon="mdi-email" color="blue" />
        <v-text-field v-model="signup.password" label="Create password" variant="underlined"
          prepend-inner-icon="mdi-lock" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" color="blue" />
        <v-btn :loading="signup.loading" @click="signup.createUser" block height="45" class="bg-blue mt-4" rounded="lg" flat>Sign Up</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useSignupStore } from '@/store/auth/signup';
import { ref } from 'vue'

const show1 = ref(false)
const rules = ref({
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters'
})

const signup = useSignupStore()
</script>
