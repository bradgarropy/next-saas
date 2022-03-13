import {post} from "@bradgarropy/http"
import SEO from "@bradgarropy/next-seo"
import Layout from "components/Layout"
import {GetStaticProps} from "next"
import {FC} from "react"
import Stripe from "stripe"
import {Product} from "types/product"
import {getStripeClient} from "utils/stripeClient"
import {stripeServer} from "utils/stripeServer"

type IndexPageProps = {
    products: Product[]
}

const IndexPage: FC<IndexPageProps> = ({products}) => {
    const handleCheckout = async (product: Product) => {
        const session = await post<Stripe.Checkout.Session>("/api/checkout", {
            body: {priceId: product.price.id},
        })

        const stripeClient = await getStripeClient()
        stripeClient.redirectToCheckout({sessionId: session.id})
    }

    return (
        <Layout>
            <SEO title="next todo" />

            <h1>pricing</h1>

            {products.map(product => {
                return (
                    <button
                        key={product.id}
                        onClick={() => handleCheckout(product)}
                    >
                        {`${product.name} $${product.price.amount}`}
                    </button>
                )
            })}
        </Layout>
    )
}

const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
    const {data: productsList} = await stripeServer.products.list()
    const {data: pricesList} = await stripeServer.prices.list()

    const products = productsList.map<Product>(productListItem => {
        const productPrice = pricesList.find(
            price => price.product === productListItem.id,
        )

        const product = {
            id: productListItem.id,
            name: productListItem.name,
            price: {
                id: productPrice.id,
                amount: productPrice.unit_amount / 100,
            },
        }

        return product
    })

    return {
        props: {
            products,
        },
    }
}

export default IndexPage
export {getStaticProps}
