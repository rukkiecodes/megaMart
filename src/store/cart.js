// Utilities
import { db } from "@/plugins/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
  }),

  actions: {
    async getCart() {
      const userData = await JSON.parse(localStorage.megamartUser);

      const q = collection(db, "users", userData.uid, "cart");
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.cart = [];
        querySnapshot.forEach((doc) => {
          this.cart.push({
            cart: doc.id,
            ...doc.data(),
          });
        });
      });

      return unsubscribe;
    },
  },
});
