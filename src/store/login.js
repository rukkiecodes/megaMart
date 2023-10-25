import { defineStore } from "pinia";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/plugins/firebase";
import router from "@/router";

export const useLoginStore = defineStore("login", {
  state: () => ({
    email: "",
    password: "",
  }),
  actions: {
    logInUser() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((user) => {
          console.log(user);
          localStorage.megamartUser = JSON.stringify(user.user);
          router.push("/app")
        })
        
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
