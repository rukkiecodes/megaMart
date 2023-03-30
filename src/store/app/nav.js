// Utilities
import { defineStore } from 'pinia'

export const useNavStore = defineStore('nav', {
    state: () => ({
        routes: [
            {
                title: 'Home',
                to: '/app'
            },
            // {
            //     title: 'Supermarket',
            //     to: '/app/supermarket'
            // }
        ]
    }),
})
