// Utilities
import { db } from '@/plugins/firebase'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useShoplistingStore = defineStore('shoplisting', {
    state: () => ({
        goods: [],
        myGoods: []
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
        },

        async userAds() {
            const userData = await JSON.parse(localStorage.megaMartUser)

            const q = query(collection(db, "ads"), where('seller', '==', userData.uid), limit(200))

            const querySnapshot = await getDocs(q)

            this.myGoods = []
            querySnapshot.forEach((doc) => {
                this.myGoods.push({
                    id: doc.id,
                    ...doc.data()
                })
            });
        }
    }
})
