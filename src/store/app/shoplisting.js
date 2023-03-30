// Utilities
import { defineStore } from 'pinia'

export const useShoplistingStore = defineStore('shoplisting', {
    state: () => ({
        goods: [
            {
                id: 1,
                title: 'XIAOMI A1 Plus, 6.52" 4G LTE, 2GB/32GB Memory, Fingerprint, Face ID Recognition, Dual 8 MP, F/2.0, (wide)0.08 MP Camera - Blue',
                image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/36/0228491/1.jpg?0412'
            }
        ]
    }),
})
