// Utilities
import { defineStore } from 'pinia'

export const useSigninStore = defineStore('signin', {
    state: () => ({
        email: '',
        password: '',
        loading: false
    }),

    actions: {
        signinUser() { }
    }
})
