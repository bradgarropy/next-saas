import type {NextApiHandler} from "next"
import Stripe from "stripe"
import {stripeServer} from "utils/stripeServer"

const checkoutHandler: NextApiHandler<Stripe.Checkout.Session> = async (
    req,
    res,
) => {
    const session = await stripeServer.checkout.sessions.create({
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
        line_items: [{price: req.body.priceId, quantity: 1}],
        mode: "subscription",
    })

    res.status(200).json(session)
}

export default checkoutHandler
