import {post} from "@bradgarropy/http"
import Link from "@bradgarropy/next-link"
import {User} from "@supabase/supabase-js"
import {FC} from "react"
import Stripe from "stripe"
import {Subscription} from "types/subscription"

import AccountStyles from "./Account.module.css"

type AccountProps = {
    user: User
    subscription: Subscription
}

const Account: FC<AccountProps> = ({user, subscription}) => {
    const handleClick = async () => {
        const session = await post<Stripe.BillingPortal.Session>("/api/portal")
        window.location.href = session.url
    }

    return (
        <div className={AccountStyles.account}>
            <div className={AccountStyles.email}>
                <p className={AccountStyles.title}>Email</p>
                <p>{user?.email}</p>
            </div>

            <div className={AccountStyles.subscription}>
                <p className={AccountStyles.title}>Subscription</p>
                {subscription ? (
                    <>
                        <p>{subscription.name}</p>

                        <p>{`$${subscription.price / 100} / ${
                            subscription.interval
                        }`}</p>

                        <button
                            className={AccountStyles.change}
                            type="button"
                            onClick={handleClick}
                        >
                            change plan
                        </button>
                    </>
                ) : (
                    <p>
                        No active <Link to="/">subscription</Link>.
                    </p>
                )}
            </div>
        </div>
    )
}

export default Account
