<template>
  <v-container>
    <v-row v-if="cart.cart.length >= 1">
      <v-col cols="12" sm="8">
        <v-row>
          <v-col v-for="(cart, i) in cart.cart" :key="i" cols="12">
            <v-card rounded="xl">
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" sm="8">
                    <v-row dense>
                      <v-col cols="2">
                        <v-card flat>
                          <v-img :src="cart?.image" />
                        </v-card>
                      </v-col>

                      <v-col cols="10">
                        <v-card flat>
                          <v-card-text class="text-h5 pb-0">
                            <router-link
                              class="text-decoration-none text-grey-darken-4"
                              :to="`/app/products/${cart?.id}`"
                              >{{ cart?.name }}</router-link
                            >
                          </v-card-text>
                          <v-card-text class="pb-0"
                            >Seller:
                            <SellerNameVue :cart="cart" />
                          </v-card-text>
                          <v-card-text>{{ cart.availability }}</v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="4" class="d-flex justify-sm-end">
                    <v-card flat>
                      <v-card-title
                        >₦{{
                          cart.price
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}</v-card-title
                      >
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="removeItem(cart)" color="blue">
                  <v-icon class="mr-2">mdi-delete-outline</v-icon>
                  Remove
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card rounded="xl">
          <v-card-title class="text-body-1">CART SUMMARY</v-card-title>
          <v-divider />
          <v-card-text class="d-flex justify-space-between">
            <span class="text-body-2 font-weight-bold text-grey-darken-3"
              >Items:</span
            >
            <span class="text-body-2 font-weight-bold text-grey-darken-3">{{
              cart.cart.length
            }}</span>
          </v-card-text>
          <v-card-text class="d-flex justify-space-between">
            <span class="text-body-2 font-weight-bold text-grey-darken-3"
              >Sub total:</span
            >
            <span class="text-body-2 font-weight-bold text-grey-darken-3"
              >₦{{
                subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}</span
            >
          </v-card-text>
          <v-card-text class="d-flex justify-space-between">
            <span class="text-body-2 font-weight-bold text-grey-darken-3"
              >Shipping:</span
            >
            <span class="text-body-2 font-weight-bold text-grey-darken-3"
              >₦{{
                shipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}</span
            >
          </v-card-text>
          <v-card-text class="d-flex justify-space-between">
            <span class="text-body-2 font-weight-bold text-grey-darken-3"
              >Total:</span
            >
            <span class="text-body-2 font-weight-bold text-grey-darken-3"
              >₦{{
                total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}</span
            >
          </v-card-text>
          <v-card-actions>
            <v-btn to="/app/checkout" block class="bg-blue" rounded="xl"
              >Check out ₦{{
                total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-card v-else flat class="mt-16">
      <v-card-text class="text-center text-h3" style="line-height: 1em"
        >Your cart is empty at the moment</v-card-text
      >
    </v-card>
  </v-container>
</template>

<script setup>
import SellerNameVue from "@/components/SellerName.vue";
import { db } from "@/plugins/firebase";
import { useCartStore } from "@/store/cart";
import { deleteDoc, doc } from "firebase/firestore";
import { onMounted, ref } from "vue";
const cart = useCartStore();

let subTotal = ref(0);
let shipping = ref(0);
let total = ref(0);

const calculateCart = () => {
  const sum = cart.cart.reduce((total, item) => {
    return parseFloat(total) + parseFloat(item.price);
  }, 0);

  subTotal.value = sum;

  const sum2 = cart.cart.reduce((acc, obj) => {
    return parseFloat(acc) + parseFloat(obj.price);
  }, 0);

  const average = sum2 / cart.cart.length / 8;

  shipping.value = average;

  total.value = subTotal.value + shipping.value;
};

onMounted(() => {
  setTimeout(() => {
    calculateCart();
  }, 5000);
});

const removeItem = async (item) => {
  let user = JSON.parse(localStorage.megamartUser).uid;

  await deleteDoc(doc(db, "users", user, "cart", item.cart));

  calculateCart()
  alert("Item deleted from cart");
};
</script>
