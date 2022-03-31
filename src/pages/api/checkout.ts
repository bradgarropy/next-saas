import {getUser, withAuthRequired} from "@supabase/supabase-auth-helpers/nextjs"
import type {NextApiHandler} from "next"
import Stripe from "stripe"
import {stripeServer} from "utils/stripeServer"
import {createUrl} from "utils/url"

const checkoutHandler: NextApiHandler<Stripe.Checkout.Session> = async (
    req,
    res,
) => {
    const {price} = req.body
    const {user} = await getUser({req, res})

    const {data: customers} = await stripeServer.customers.list({
        email: user.email,
        limit: 1,
    })

    const customer = customers[0]

    console.log(process.env.URL)
    console.log(process.env.VERCEL_URL)

    const sessionCreateParams: Stripe.Checkout.SessionCreateParams = {
        success_url: createUrl("/todos"),
        cancel_url: createUrl("/"),
        line_items: [
            {
                price: price.id,
                quantity: 1,
            },
        ],
        mode: "subscription",
        subscription_data: {
            metadata: {
                userId: user.id,
            },
        },
    }

    if (customer) {
        sessionCreateParams.customer = customer.id
    } else {
        sessionCreateParams.customer_email = user?.email
    }

    const session = await stripeServer.checkout.sessions.create(
        sessionCreateParams,
    )

    res.status(200).json(session)
}

export default withAuthRequired(checkoutHandler)
