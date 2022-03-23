import {Product} from "types/product"
import {stripeServer} from "utils/stripeServer"

const readAllProducts = async (): Promise<Product[]> => {
    const {data: productsList} = await stripeServer.products.list()
    const {data: pricesList} = await stripeServer.prices.list()

    const products = productsList
        .map<Product>(productListItem => {
            const productPrice = pricesList.find(
                price => price.product === productListItem.id,
            )

            const product: Product = {
                id: productListItem.id,
                name: productListItem.name,
                price: {
                    id: productPrice.id,
                    amount: productPrice.unit_amount / 100,
                    interval: productPrice.recurring.interval,
                },
            }

            return product
        })
        .sort((a, b) => a.price.amount - b.price.amount)

    return products
}

export {readAllProducts}
