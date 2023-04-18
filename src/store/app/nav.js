// Utilities
import { defineStore } from 'pinia'

export const useNavStore = defineStore('nav', {
    state: () => ({
        routes: [
            {
                title: 'Home',
                to: '/app/products'
            },
            {
                title: 'Profile',
                to: '/app/profile'
            },
            {
                title: 'Cart',
                to: '/app/cart'
            },
            {
                title: 'Sell',
                to: '/app/sell'
            },
        ]
    }),
})
