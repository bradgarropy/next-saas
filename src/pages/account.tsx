import {post} from "@bradgarropy/http"
import SEO from "@bradgarropy/next-seo"
import Layout from "components/Layout"
import {FC, useEffect, useState} from "react"
import Stripe from "stripe"
import {Subscription} from "types/subscription"
import {readSubscriptionByUser} from "utils/subscriptions"
import {supabase} from "utils/supabase"

const AccountPage: FC = () => {
    const [subscription, setSubscription] = useState<Subscription>()
    const user = supabase.auth.user()

    useEffect(() => {
        const fetch = async () => {
            const newSubscription = await readSubscriptionByUser(user.id)
            setSubscription(newSubscription)
        }

        fetch()
    }, [user?.id])

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
            ) : null}
        </Layout>
    )
}

export default AccountPage
