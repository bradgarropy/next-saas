import {post} from "@bradgarropy/http"
import Link from "@bradgarropy/next-link"
import {User} from "@supabase/supabase-js"
import {FC} from "react"
import Stripe from "stripe"
import {Subscription} from "types/subscription"

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
        <div className="grid gap-12">
            <div className="flex flex-col gap-4">
                <p className="text-2xl font-bold">Email</p>
                <p>{user?.email}</p>
            </div>

            <div className="flex flex-col gap-4">
                <p className="text-2xl font-bold">Subscription</p>
                {subscription ? (
                    <>
                        <p>{subscription.name}</p>

                        <p>{`$${subscription.price / 100} / ${
                            subscription.interval
                        }`}</p>

                        <button
                            className="mt-12 rounded-lg border-2 border-gray-900 bg-gray-50 py-2 px-4 text-gray-900 transition-transform hover:scale-105"
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
