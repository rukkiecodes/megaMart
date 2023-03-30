// Utilities
import { db } from '@/plugins/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useUpdateProfileStore } from './updateProfile'

const update = useUpdateProfileStore()

export const useProfileStore = defineStore('profile', {
    state: () => ({
        user: null
    }),

    actions: {
        async getUserProfile() {
            const userData = await JSON.parse(localStorage.megaMartUser)

            const unsub = onSnapshot(doc(db, 'users', userData.uid),
                doc => {
                    this.user = doc.data()

                    update.name = doc.data()?.name
                    update.address = doc.data()?.address
                    update.phone = doc.data()?.phone
                })

            return unsub
        }
    }
})
