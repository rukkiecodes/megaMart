// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    snackbar: false,
    snackbarText: '',
    snackbarColor: '',
  }),
})
