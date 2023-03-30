// Utilities
import { db } from '@/plugins/firebase'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useUpdateProfileStore = defineStore('updateProfile', {
    state: () => ({
        name: '',
        address: '',
        phone: '',
        loading: false,
        dialog: false
    }),

    actions: {
        async update() {
            const userData = await JSON.parse(localStorage.megaMartUser)

            this.loading = true

            await updateDoc(doc(db, 'users', userData.uid), {
                name: this.name,
                address: this.address,
                phone: this.phone
            })

            this.loading = false
            this.dialog = false
        }
    }
})
