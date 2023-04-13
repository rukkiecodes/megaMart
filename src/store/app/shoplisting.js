// Utilities
import { db } from '@/plugins/firebase'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useShoplistingStore = defineStore('shoplisting', {
    state: () => ({
        goods: []
    }),

    actions: {
        async getAds() {
            const q = query(collection(db, "ads"), limit(200))

            const querySnapshot = await getDocs(q)

            this.goods = []
            querySnapshot.forEach((doc) => {
                this.goods.push({
                    id: doc.id,
                    ...doc.data()
                })
            });
        }
    }
})
