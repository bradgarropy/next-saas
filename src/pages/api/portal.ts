import type {NextApiHandler} from "next"
import Stripe from "stripe"
import {stripeServer} from "utils/stripeServer"

const portalHandler: NextApiHandler<Stripe.BillingPortal.Session> = async (
    req,
    res,
) => {
    const {customerId} = req.body

    const session = await stripeServer.billingPortal.sessions.create({
        customer: customerId,
        return_url: "http://localhost:3000/account",
    })

    // res.status(200).json(session)
    res.redirect(session.url)
    return
}

export default portalHandler
