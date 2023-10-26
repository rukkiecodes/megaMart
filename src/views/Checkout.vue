<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8">
        <v-card rounded="xl">
          <v-card-text>
            <v-row dense>
              <v-col v-for="(cart, i) in cart.cart" :key="i" cols="12" sm="6">
                <v-card flat rounded="xl">
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="2">
                        <v-card flat>
                          <v-img :src="cart?.image" />
                        </v-card>
                      </v-col>

                      <v-col cols="10">
                        <v-card flat>
                          <v-card-text class="text-h6 pa-0">
                            <router-link class="text-decoration-none text-grey-darken-4"
                              :to="`/app/products/${cart?.id}`">{{ cart?.name }}</router-link>
                          </v-card-text>
                          <v-card-text class="pa-0">Quantity: {{ cart?.quantity }}</v-card-text>
                          <v-card-text class="pa-0">Price: ₦{{
                            cart.price
                              ?.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }}</v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/app/cart" color="blue" block rounded="xl" variant="tonal">
              Modify cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4" v-if="profile.user">
        <v-card rounded="xl">
          <v-card-title class="text-body-1">CART SUMMARY</v-card-title>
          <v-divider />
          <v-card-text class="d-flex justify-space-between">
            <span class="text-body-2 font-weight-bold text-grey-darken-3">Items:</span>
            <span class="text-body-2 font-weight-bold text-grey-darken-3">{{
              cart.cart.length
            }}</span>
          </v-card-text>
          <v-card-text class="d-flex justify-space-between">
            <span class="text-body-2 font-weight-bold text-grey-darken-3">Sub total:</span>
            <span class="text-body-2 font-weight-bold text-grey-darken-3">₦{{
              subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</span>
          </v-card-text>
          <v-card-text class="d-flex justify-space-between">
            <span class="text-body-2 font-weight-bold text-grey-darken-3">Shipping:</span>
            <span class="text-body-2 font-weight-bold text-grey-darken-3">₦{{
              shipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</span>
          </v-card-text>
          <v-card-text class="d-flex justify-space-between">
            <span class="text-body-2 font-weight-bold text-grey-darken-3">Total:</span>
            <span class="text-body-2 font-weight-bold text-grey-darken-3">₦{{
              total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</span>
          </v-card-text>
          <v-card-actions>
            <paystack buttonClass="bg-blue rounded-xl" style="width: 100%; height: 3em" :buttonText="`Check out ₦ ${total
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`" :publicKey="publicKey" :email="profile.user?.email"
              :amount="total * 100" :reference="reference" :onSuccess="onSuccessfulPayment" :onCanel="onCancelledPayment">
            </paystack>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useCartStore } from "@/store/cart";
import { onMounted, ref } from "vue";
import paystack from "vue3-paystack";
import { v4 as uuidv4 } from "uuid";
import { useProfileStore } from "@/store/profile";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db } from "@/plugins/firebase";
import router from "@/router";
import calculateSubtotal from '@/components/lib/calculateSubtotal'

export default {
  data: () => ({
    subTotal: 0,
    shipping: 0,
    total: 0,
    reference: '',
    publicKey: ''
  }),

  components: {
    paystack
  },

  setup() {
    const cart = useCartStore();
    const profile = useProfileStore();

    return {
      cart,
      profile
    }
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.calculateCart()
      }, 5000)

      this.reference = `MegaMart-${uuidv4()}`
      this.publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC
    })
  },

  methods: {
    calculateCart() {
      calculateSubtotal(this.cart.cart)
        .then(({ finalPrice, subTotal, totalVAT }) => {
          this.subTotal = parseFloat(subTotal.replace(/,/g, ''))
          this.shipping = (parseFloat(subTotal.replace(/,/g, '')) / this.cart.cart.length) / 10

          this.total = this.subTotal + this.shipping
        })
    },

    async onSuccessfulPayment(response) {
      this.reference = `MegaMart-${uuidv4()}`;

      await addDoc(collection(db, "users", this.profile.user.id, "orders"), {
        cart: [...this.cart.cart],
        subTotal: this.subTotal,
        shipping: this.reference,
        total: this.total,
        reference: this.reference,
        payment: { ...response },
        orderedAt: serverTimestamp(),
      });

      this.cart.cart.forEach(async (cart) => {
        await deleteDoc(doc(db, "users", this.profile.user.id, "cart", cart.cart));
        await updateDoc(doc(db, "ads", cart.id), {
          quantity: increment(-1),
        });
        router.push("/app");
      });
    },

    onCancelledPayment() {
      console.log("canceled payment");
    }
  }
}

// const onCancelledPayment = () => {
//   console.log("canceled payment");
// };
</script>
