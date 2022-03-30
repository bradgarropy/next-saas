import {post} from "@bradgarropy/http"
import SEO from "@bradgarropy/next-seo"
import {useUser} from "@supabase/supabase-auth-helpers/react"
import Layout from "components/Layout"
import Pricing from "components/Pricing"
import {GetStaticProps} from "next"
import {useRouter} from "next/router"
import {FC} from "react"
import Stripe from "stripe"
import {Product} from "types/product"
import {readAllProducts} from "utils/products"
import {getStripeClient} from "utils/stripeClient"

type IndexPageProps = {
    products: Product[]
}

const IndexPage: FC<IndexPageProps> = ({products}) => {
    const {user} = useUser()
    const router = useRouter()

    const onCheckout = async (product: Product) => {
        if (!user) {
            router.push("/signin")
            return
        }

        const checkout = await post<Stripe.Checkout.Session>("/api/checkout", {
            body: {
                price: {
                    id: product.price.id,
                },
            },
        })

        const stripeClient = await getStripeClient()
        stripeClient.redirectToCheckout({sessionId: checkout.id})
    }

    return (
        <Layout>
            <SEO title="pricing" />

            <h1>pricing</h1>
            <Pricing products={products} onCheckout={onCheckout} />
        </Layout>
    )
}

const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
    const products = await readAllProducts()

    return {
        props: {
            products,
        },
    }
}

export default IndexPage
export {getStaticProps}
