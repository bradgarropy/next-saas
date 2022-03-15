import type {NextApiHandler} from "next"
import Stripe from "stripe"
import {stripeServer} from "utils/stripeServer"

const checkoutHandler: NextApiHandler<Stripe.Checkout.Session> = async (
    req,
    res,
) => {
    const {user, price} = req.body

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
    })

    res.status(200).json(session)
}

export default checkoutHandler
