import {post} from "@bradgarropy/http"
import Link from "@bradgarropy/next-link"
import SEO from "@bradgarropy/next-seo"
import Layout from "components/Layout"
import {useUser} from "hooks"
import {useRouter} from "next/router"
import {FC, useEffect} from "react"
import Stripe from "stripe"

const AccountPage: FC = () => {
    const router = useRouter()
    const {user, subscription} = useUser()

    useEffect(() => {
        if (!user) {
            router.push("/signin")
            return
        }
    }, [user, router])

    const handleClick = async () => {
        const session = await post<Stripe.BillingPortal.Session>(
            "/api/portal",
            {
                body: {
                    customerId: subscription.customerId,
                },
            },
        )

        window.location.href = session.url
    }

    return (
        <Layout>
            <SEO title="account" />

            <h1>account</h1>

            {user ? <p>{user?.email}</p> : null}

            {subscription ? (
                <>
                    <p>{subscription.name}</p>

                    <p>{`$${subscription.price / 100} / ${
                        subscription.interval
                    }`}</p>

                    <button type="button" onClick={handleClick}>
                        change plan
                    </button>
                </>
            ) : (
                <p>
                    No active <Link to="/">subscription</Link>.
                </p>
            )}
        </Layout>
    )
}

export default AccountPage
