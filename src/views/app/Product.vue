<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="5">
                <v-card rounded="xl">
                    <v-img :src="product?.image" />
                </v-card>
            </v-col>
            <v-col cols="12" sm="7">
                <v-card rounded="xl">
                    <v-card-text class="text-h5 font-weight-bold" style="line-height: 1.5em;">{{ product?.name
                    }}</v-card-text>
                    <v-card-text class="d-flex justify-space-between"><span class="text-h5 font-weight-bold">₦ {{
                        product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span> <span
                            class="font-weight-bold">{{
                                product?.availability }}</span></v-card-text>
                    <v-card-text class="d-flex justify-space-between"><span class="font-weight-bold">+Shipping ₦{{
                        product?.shippingCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span></v-card-text>

                    <v-card-title class="text-body-1">VARIATION AVAILABLE</v-card-title>
                    <v-card-text>
                        <v-btn v-for="(variation, i) in product?.variations" :key="i" size="large" class="mr-2"
                            variant="outlined" color="blue" rounded="lg">{{ variation }}</v-btn>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn size="x-large" class="bg-blue" rounded="xl" style="flex: 1;">Add to cart</v-btn>
                        <v-btn icon size="large">
                            <v-icon>mdi-heart-outline</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { db } from '@/plugins/firebase';
import { doc, getDoc } from '@firebase/firestore';

export default {
    data: () => ({
        product: null
    }),
    mounted() {
        this.$nextTick(() => {
            this.getProduct(this.$route.params.product)
        })
    },

    methods: {
        async getProduct(prop) {
            let product = (await getDoc(doc(db, 'ads', prop))).data()
            this.product = {
                id: prop,
                ...product
            }
        }
    }
}
</script>
