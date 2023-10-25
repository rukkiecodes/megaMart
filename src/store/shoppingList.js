// Utilities
import { db } from "@/plugins/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { defineStore } from "pinia";

export const useShoplistingStore = defineStore("shoplisting", {
  state: () => ({
    goods: [],
    myGoods: [],
  }),

  actions: {
    async userAds() {
      const userData = await JSON.parse(localStorage.megamartUser);

      const q = query(collection(db, "ads"), where('seller', '==', userData.uid), limit(200))

      const querySnapshot = await getDocs(q)

      this.myGoods = []
      querySnapshot.forEach((doc) => {
          this.myGoods.push({
              id: doc.id,
              ...doc.data()
          })
      });
    },
  },
});
