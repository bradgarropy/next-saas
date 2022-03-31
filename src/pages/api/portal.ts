import {getUser, withAuthRequired} from "@supabase/supabase-auth-helpers/nextjs"
import type {NextApiHandler} from "next"
import Stripe from "stripe"
import {stripeServer} from "utils/stripeServer"
import {readSubscriptionByUser} from "utils/subscriptions"

const portalHandler: NextApiHandler<Stripe.BillingPortal.Session> = async (
    req,
    res,
) => {
    const {user} = await getUser({req, res})
    const subscription = await readSubscriptionByUser({req}, user.id)

    const session = await stripeServer.billingPortal.sessions.create({
        customer: subscription.customerId,
        return_url: "http://localhost:3000/account",
    })

    res.status(200).json(session)
}

export default withAuthRequired(portalHandler)
