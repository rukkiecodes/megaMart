// Utilities
import { defineStore } from 'pinia'

export const useSellStore = defineStore('sell', {
    state: () => ({
        image: null,
        imagePreview: null,
        variations: '',
        shippingOptions: '',

        form: {
            name: "name",
            description: "description",
            category: "category",
            subcategory: '',
            price: 20000,
            quantity: 1,
            variations: [],
            weight: 20,
            dimensions: "dimensions",
            shippingOptions: [],
            shippingCost: 1000,
            condition: "",
            brand: "",
            modelNumber: "",
            reviews: [],
            seller: {
                name: "",
                location: "",
                policies: {
                    returns: "",
                    refunds: "",
                    exchanges: ""
                }
            }
        },

        loading: false
    }),

    actions: {
        createAd() {
            let input = this.form
            console.log({
                name: input.name,
                description: input.description,
                category: input.category,
                subcategory: input.subcategory,
                image: this.image,
                price: input.price,
                quantity: input.quantity,
                shippingCost: input.shippingCost
            })
            if (input.name == '' || input.description == '' || input.category == '' || input.subcategory.length < 1 || !this.image || input.price == 0 || input.quantity == 0 || input.shippingCost == 0) {
                console.log('Fill form')
            } else {
                console.log('all good')
            }
        }
    }
})
