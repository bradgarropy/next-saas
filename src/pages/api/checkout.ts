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

    const session = await stripeServer.checkout.sessions.create({
        success_url: "http://localhost:3000/todos",
        cancel_url: "http://localhost:3000",
        line_items: [
            {
                price: price.id,
                quantity: 1,
            },
        ],
        mode: "subscription",
        client_reference_id: user.id,
        customer_email: user.email,
        metadata: {
            userId: user.id,
        },
        subscription_data: {
            metadata: {
                userId: user.id,
            },
        },
    })

    res.status(200).json(session)
}

export default checkoutHandler
