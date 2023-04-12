<template>
    <v-container>
        <v-toolbar color="transparent">
            <v-toolbar-title class="font-weight-bold text-grey-darken-4">Post ad</v-toolbar-title>
        </v-toolbar>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-card color="blue" class="d-flex align-center justify-center flex-column" min-height="250" rounded="lg">
                    <v-icon v-if="!sell.imagePreview" size="x-large">mdi-image-plus</v-icon>
                    <v-img v-else :src="sell.imagePreview" width="100%" cover />
                </v-card>
                <v-card flat>
                    <v-card-title>Variations</v-card-title>
                    <v-card-text v-if="sell.form.variations.length >= 1">
                        <v-chip v-for="(variation, i) in sell.form.variations" :key="i"
                            @dblclick="sell.form.variations.splice(i, 1)" class="ma-2">{{ variation
                            }}</v-chip>
                    </v-card-text>
                    <v-card-text v-else class="text-grey-darken-4">You ave not listed any variation</v-card-text>
                </v-card>
                <v-card flat>
                    <v-card-title>Shipping options</v-card-title>
                    <v-card-text v-if="sell.form.shippingOptions.length >= 1">
                        <v-chip v-for="(shippingOption, i) in sell.form.shippingOptions" :key="i"
                            @dblclick="sell.form.shippingOptions.splice(i, 1)" class="ma-2">{{ shippingOption
                            }}</v-chip>
                    </v-card-text>
                    <v-card-text v-else class="text-grey-darken-4">You ave not listed any Shipping Options</v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="8">
                <v-row dense>
                    <v-col cols="12" sm="6">
                        <v-file-input @change="setImage" label="Product image" variant="underlined" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="sell.form.name" label="Product name" variant="underlined" />
                    </v-col>
                    <v-col cols="12">
                        <v-textarea v-model="sell.form.description" label="Description" variant="underlined" rows="2" auto-grow />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-autocomplete v-model="sell.form.category" :items="app.categories" @update:model-value="e => currentSub(e)" item-title="name"
                            item-value="name" label="Category" variant="underlined" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-autocomplete v-model="sell.form.subcategory" :items="subcategories" label="Sub Category" variant="underlined" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="sell.form.price" label="Price" variant="underlined" type="number" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="sell.form.quantity" label="Quantity" variant="underlined" type="number" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field @keypress.enter="setVariations" label="Variations" v-model="sell.variations"
                            variant="underlined" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="sell.form.weight" label="Weight" variant="underlined" type="number" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="sell.form.dimensions" label="Dimensions" variant="underlined" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="sell.shippingOptions" @keypress.enter="setShippingOptions"
                            label="Shipping options" variant="underlined" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="sell.form.shippingCost" label="Shipping cost" variant="underlined" type="number" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="sell.form.brand" label="Brand" variant="underlined" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="sell.form.modelNumber" label="Model number" variant="underlined" />
                    </v-col>
                    <v-col cols="12">
                        <v-btn @click="sell.createAd" :loading="sell.loading" block color="blue" size="large" rounded="lg">Post Ad</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { useSellStore } from "@/store/app/sell/sell";
import { ref } from "vue";

const app = useAppStore()
const sell = useSellStore()
let subcategories = ref([])

const currentSub = e => {
    let currnetSubcategories = app.categories.filter(obj => obj.name === e)
    let object = { ...currnetSubcategories }[0].subcategories
    subcategories.value = object
}

const setImage = e => {
    const file = e.target.files[0]

    if (!file) return

    sell.imagePreview = URL.createObjectURL(file)
    sell.image = file
}

const setVariations = () => {
    if (sell.variations == '') return
    sell.form.variations.push(sell.variations)
    sell.variations = ''
}

const setShippingOptions = () => {
    if (sell.shippingOptions == '') return
    sell.form.shippingOptions.push(sell.shippingOptions)
    sell.shippingOptions = ''
}
</script>