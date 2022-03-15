import type {NextApiHandler} from "next"
import Stripe from "stripe"
import {stripeServer} from "utils/stripeServer"
import {createSubscription} from "utils/subscriptions"

const config = {
    api: {
        bodyParser: false,
    },
}

const buffer = async readable => {
    const chunks = []

    for await (const chunk of readable) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
    }

    return Buffer.concat(chunks)
}

const stripeHandler: NextApiHandler = async (req, res) => {
    const body = await buffer(req)
    const stripeSignature = req.headers["stripe-signature"]

    const event = stripeServer.webhooks.constructEvent(
        body,
        stripeSignature,
        process.env.STRIPE_WEBHOOK_SECRET_KEY,
    )

    console.log(`EVENT: ${event.type}`)

    switch (event.type) {
        case "checkout.session.completed": {
            console.log("checkout.session.completed")

            const session = event.data.object as Stripe.Checkout.Session

            const subscription = await stripeServer.subscriptions.retrieve(
                session.subscription as string,
            )

            const {plan} = subscription.items.data[0]

            await createSubscription({
                userId: session.client_reference_id,
                customerId: session.customer as string,
                subscriptionId: session.subscription as string,
                price: plan.amount,
                interval: plan.interval,
            })

            break
        }

        case "customer.subscription.created": {
            console.log("customer.subscription.created")

            break
        }

        case "customer.subscription.updated": {
            console.log("customer.subscription.updated")
            break
        }

        case "customer.subscription.deleted": {
            console.log("customer.subscription.deleted")
            break
        }
    }

    res.status(200).json({received: true})
}

export default stripeHandler
export {config}
