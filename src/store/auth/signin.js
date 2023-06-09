// Utilities
import { auth } from '@/plugins/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { defineStore } from 'pinia'

import router from '@/router'

import { useAppStore } from '@/store/app'

const snackbar = useAppStore()

export const useSigninStore = defineStore('signin', {
    state: () => ({
        email: '',
        password: '',
        loading: false
    }),

    actions: {
        signinUser() {
            if (this.email == '' || this.password == '') {
                snackbar.snackbar = true
                snackbar.snackbarText = 'Please fill in all fields'
                snackbar.snackbarColor = 'error'
            } else {
                this.loading = true

                signInWithEmailAndPassword(auth, this.email, this.password)
                    .then(user => {
                        localStorage.megaMartUser = JSON.stringify(user.user)

                        this.loading = false
                        router.push('/app/products')
                    })
                    .catch((error) => {
                        this.loading = false
                        const errorCode = error.code

                        if (errorCode == 'auth/email-already-in-use') {
                            snackbar.snackbar = true
                            snackbar.snackbarText = 'Email already in use'
                            snackbar.snackbarColor = 'red'
                        } else if (errorCode == 'auth/invalid-email') {
                            snackbar.snackbar = true
                            snackbar.snackbarText = 'Invalid email'
                            snackbar.snackbarColor = 'red'
                        } else if (errorCode == 'auth/weak-password') {
                            snackbar.snackbar = true
                            snackbar.snackbarText = 'Weak password'
                            snackbar.snackbarColor = 'red'
                        } else if (errorCode == 'auth/operation-not-allowed') {
                            snackbar.snackbar = true
                            snackbar.snackbarText = 'Operation not allowed'
                            snackbar.snackbarColor = 'red'
                        } else if (errorCode == 'auth/user-disabled') {
                            snackbar.snackbar = true
                            snackbar.snackbarText = 'User disabled'
                            snackbar.snackbarColor = 'red'
                        } else if (errorCode == 'auth/user-not-found') {
                            snackbar.snackbar = true
                            snackbar.snackbarText = 'User not found'
                            snackbar.snackbarColor = 'red'
                        } else if (errorCode == 'auth/wrong-password') {
                            snackbar.snackbar = true
                            snackbar.snackbarText = 'Wrong password'
                            snackbar.snackbarColor = 'red'
                        } else if (errorCode == 'auth/invalid-verification-code') {
                            snackbar.snackbar = true
                            snackbar.snackbarText = 'Invalid verification code'
                            snackbar.snackbarColor = 'red'
                        } else if (errorCode == 'auth/invalid-verification-id') {
                            snackbar.snackbar = true
                            snackbar.snackbarText = 'Invalid verification id'
                            snackbar.snackbarColor = 'red'
                        }
                    })
            }
        }
    }
})
