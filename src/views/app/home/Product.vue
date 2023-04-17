<template>
    <v-container>
        <v-card rounded="xl">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="5">
                        <v-card flat>
                            <v-img :src="product?.image" />
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="7">
                        <v-card flat>
                            <v-card-text class="text-h5 font-weight-bold" style="line-height: 1.5em;">{{ product?.name
                            }}</v-card-text>
                            <v-card-text class="d-flex justify-space-between"><span class="text-h5 font-weight-bold">₦ {{
                                product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span> <span
                                    class="font-weight-bold">{{
                                        product?.availability }}</span></v-card-text>
                            <v-card-text class="d-flex justify-space-between"><span class="font-weight-bold">+Shipping ₦{{
                                product?.shippingCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}</span></v-card-text>

                            <v-card-text>
                                <span class="text-grey-darken-3">Items left: {{
                                    product?.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                                <v-progress-linear :model-value="product?.quantity" color="blue" class="mt-2" />
                            </v-card-text>

                            <v-card-title class="text-body-1">VARIATION AVAILABLE</v-card-title>
                            <v-card-text>
                                <v-btn @click="clearVariations" v-if="selectedVariation.length >= 1" icon size="small" flat>
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                                <v-btn v-for="(variation, i) in product?.variations" :key="i"
                                    @click="selectVariation(variation, i)" height="50"
                                    :class="selectedVariation.includes(variation) ? 'bg-blue' : ''" class="ma-2"
                                    :variant="selectedVariation.includes(variation) ? 'tonal' : 'outlined'"
                                    :color="selectedVariation.includes(variation) ? 'white' : 'blue'" rounded="lg">{{
                                        variation
                                    }}</v-btn>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn size="large" class="bg-blue" rounded="lg" block>
                                    Add to cart

                                    <v-dialog activator="parent" v-model="dialog" width="540">
                                        <v-card rounded="xl">
                                            <v-toolbar color="transparent" density="compact">
                                                <v-toolbar-title>Please select a variation</v-toolbar-title>
                                                <v-spacer />
                                                <v-btn @click="dialog = false" icon size="small" flat>
                                                    <v-icon>mdi-close</v-icon>
                                                </v-btn>
                                            </v-toolbar>
                                            <v-card-text>
                                                <v-btn @click="clearVariations" v-if="selectedVariation.length >= 1" icon
                                                    size="small" flat>
                                                    <v-icon>mdi-close</v-icon>
                                                </v-btn>
                                                <v-btn v-for="(variation, i) in product?.variations" :key="i"
                                                    @click="selectVariation(variation, i)" height="50"
                                                    :class="selectedVariation.includes(variation) ? 'bg-blue' : ''"
                                                    class="ma-2"
                                                    :variant="selectedVariation.includes(variation) ? 'tonal' : 'outlined'"
                                                    :color="selectedVariation.includes(variation) ? 'white' : 'blue'"
                                                    rounded="lg">{{
                                                        variation
                                                    }}</v-btn>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-btn @click="dialog = false" color="blue" variant="outlined" rounded="xl"
                                                    class="text-capitalize" style="flex: 1">Continue shopping</v-btn>
                                                <v-btn @click="adToCart" color="blue" variant="tonal" rounded="xl"
                                                    class="text-capitalize" style="flex: 1">Add to cart and checkout</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-row class="mt-4">
            <v-col cols="12">
                <v-card rounded="xl">
                    <v-card-title>Product details</v-card-title>
                    <v-card-text>{{ product?.description }}</v-card-text>

                    <v-card-title>Brand</v-card-title>
                    <v-card-text>{{ product?.brand }}</v-card-text>

                    <v-card-title>Product Condition</v-card-title>
                    <v-card-text>{{ product?.condition == '' ? 'N/A' : product?.condition }}</v-card-text>

                    <v-card-title>Product weight</v-card-title>
                    <v-card-text>{{ product?.weight == '' ? 'N/A' : product?.weight }}KG</v-card-text>

                    <v-card-title>Shipping Options</v-card-title>
                    <v-card-text>
                        <v-chip v-for="(option, i) in product?.shippingOptions" :key="i" class="text-capitalize ma-2">{{
                            option }}</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="(good, i) in goods" :key="i" cols="12" sm="6" md="3">
                <v-card rounded="xl" @click="openProduct(good.id)">
                    <v-img :src="good.image" />

                    <v-card-title>{{ good.name }}</v-card-title>
                    <v-card-text class="d-flex justify-space-between"><span>₦ {{
                        good.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span> <span>{{
        good.availability }}</span></v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { db } from '@/plugins/firebase';
import { addDoc, collection, doc, getDoc, getDocs, limit, query, serverTimestamp, where } from '@firebase/firestore';
import router from '@/router';

export default {
    data: () => ({
        product: null,
        profile: null,
        goods: [],
        selectedVariation: [],
        dialog: false
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

            this.getSellerInfo(product.seller)
            this.getSimilar(product.subcategory)
        },

        async getSellerInfo(prop) {
            let user = (await getDoc(doc(db, 'users', prop))).data()

            this.profile = user
        },

        async getSimilar(prop) {
            const q = query(collection(db, "ads"), where("subcategory", "==", prop), limit(100))

            const querySnapshot = await getDocs(q)

            this.goods = []
            querySnapshot.forEach((doc) => {
                this.goods.push({
                    id: doc.id,
                    ...doc.data()
                })
            });
        },

        openProduct(prop) {
            router.push(`/app/products/${prop}`)
            this.getProduct(prop)
        },

        selectVariation(prop) {
            if (this.selectedVariation.includes(prop)) return
            else this.selectedVariation.push(prop)
        },

        clearVariations() {
            this.selectedVariation = []
        },

        async adToCart() {
            const userData = await JSON.parse(localStorage.megaMartUser)

            await addDoc(collection(db, 'users', userData.uid, 'cart'), {
                ...this.product,
                selectedVariation: this.selectedVariation,
                dataAdded: serverTimestamp()
            })

            router.push('/app/cart')
        }
    }
}
</script>
