import {post} from "@bradgarropy/http"
import Link from "@bradgarropy/next-link"
import {User} from "@supabase/supabase-js"
import {FC} from "react"
import Stripe from "stripe"
import {Subscription} from "types/subscription"

import styles from "./Account.module.css"

type AccountProps = {
    user: User
    subscription: Subscription
}

const Account: FC<AccountProps> = ({user, subscription}) => {
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
        <div className={styles.account}>
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
        </div>
    )
}

export default Account
