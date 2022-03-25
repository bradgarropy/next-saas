import type {NextApiHandler} from "next"
import Stripe from "stripe"
import {stripeServer} from "utils/stripeServer"
import {supabase} from "utils/supabase"

const checkoutHandler: NextApiHandler<Stripe.Checkout.Session> = async (
    req,
    res,
) => {
    const {price} = req.body

    const token = req.headers.authorization.split(" ")[1]
    const {user} = await supabase.auth.api.getUser(token)

    const {data: customers} = await stripeServer.customers.list({
        email: user.email,
        limit: 1,
    })

    const customer = customers[0]

    const sessionCreateParams: Stripe.Checkout.SessionCreateParams = {
        success_url: "http://localhost:3000/todos",
        cancel_url: "http://localhost:3000",
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

export default checkoutHandler
