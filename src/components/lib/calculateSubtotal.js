export default arr => {
    return new Promise((resolve, reject) => {
        let total = 0


        for (let i = 0; i < arr?.length; i++) {
            const prop = arr[i]

            let priceValue = prop?.price != (null || undefined) ? parseFloat(prop?.price) : 0
            let quantityValue = prop?.quantity != (null || undefined) ? parseFloat(prop?.quantity) : 0

            let price = priceValue * quantityValue

            total += price
        }

        const formattedResult = {
            subTotal: total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            totalVAT: 0,
            finalPrice: total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        };

        resolve(formattedResult)
    })
}