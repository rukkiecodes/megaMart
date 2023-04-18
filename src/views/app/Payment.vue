<template>
    <paystack buttonClass="'button-class btn btn-primary'" buttonText="Pay Online"
        publicKey="pk_test_514af104c122b28a6581b6d5371ca893a82c0c98" :email="email" :amount="500"
        :reference="reference">
    </paystack>
</template>

<script>
import paystack from "vue3-paystack"
import { v4 as uuidv4 } from 'uuid'
export default {
    components: {
        paystack
    },
    
    data: () => ({
        reference: '',
        email: 'rukkiecodes@gmail.com'
    }),

    mounted() {
        this.$nextTick(() => {
            this.reference = uuidv4()
        })
    }
}
</script>
