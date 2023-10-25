// Utilities
import { db } from "@/plugins/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    user: null,
    dialog: false,
    loading: false,
  }),

  actions: {
    getProfile() {
      const id = JSON.parse(localStorage.megamartUser).uid;

      const unsub = onSnapshot(doc(db, "users", id), (doc) => {
        // console.log("Current data: ", doc.data());
        this.user = doc.data();
      });

      return unsub;
    },

    async updateProfile() {
      const id = JSON.parse(localStorage.megamartUser).uid;

      this.loading = true;

      await updateDoc(doc(db, "users", id), {
        ...this.user,
      });

      this.loading = false;
      this.dialog = false;
    },
  },
});
