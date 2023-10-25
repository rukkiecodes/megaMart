<template>
  <router-link :to="`/app/profile/${user?.id}`" class="text-grey-darken-4">{{
    user?.name
  }}</router-link>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/plugins/firebase";
export default {
  props: {
    cart: Object,
  },
  data: () => ({
    user: {},
  }),

  mounted() {
    this.getUser();
  },

  methods: {
    async getUser() {
      let _user = (await getDoc(doc(db, "users", this.cart.seller))).data();
      this.user = _user;
    },
  },
};
</script>
