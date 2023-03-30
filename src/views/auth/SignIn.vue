<template>
    <v-container class="mt-16">
        <v-card rounded="xl" width="400" max-width="100%" class="mx-auto" elevation="5">
            <v-card-title class="text-center text-h5">Login</v-card-title>
            <v-card-text class="text-center text-caption">Welcome back. please fill the form to access your
                account</v-card-text>
            <v-card-text>
                <v-text-field v-model="signin.email" label="Your Email" type="email" variant="underlined" density="comfortable"
                    prepend-inner-icon="mdi-email" />
                <v-text-field v-model="signin.password" label="Your Password" variant="underlined" prepend-inner-icon="mdi-lock"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" />
                <v-btn :loading="signin.loading" @click="signin.signinUser" block height="45" class="bg-blue mt-4" rounded="lg" flat>Login</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { useSigninStore } from '@/store/auth/signin';
import { ref } from 'vue'

const show1 = ref(false)
const rules = ref({
    required: value => !!value || 'Required.',
    min: v => v.length >= 8 || 'Min 8 characters'
})

const signin = useSigninStore()
</script>
