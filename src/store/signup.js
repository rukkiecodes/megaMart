// Utilities
import { auth, db } from "@/plugins/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { defineStore } from "pinia";
import router from "@/router";
import { doc, setDoc } from "firebase/firestore";

export const useSignupStore = defineStore("signup", {
  state: () => ({
    name: "",
    email: "",
    password: "",
    loading: false,
  }),

  actions: {
    createUser() {
      this.loading = true;
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(async (user) => {
          await setDoc(doc(db, "users", user.user.uid), {
            id: user.user.uid,
            name: this.name,
            email: this.email,
          });

          this.loading = false;

          localStorage.megamartUser = JSON.stringify(user.user);
          router.push("/app");
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
});
