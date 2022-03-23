import type {NextApiHandler} from "next"
import Stripe from "stripe"
import {stripeServer} from "utils/stripeServer"
import {
    createSubscription,
    deleteSubscription,
    updateSubscription,
} from "utils/subscriptions"

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

const handleSubscriptionCreate = async (subscription: Stripe.Subscription) => {
    const {price} = subscription.items.data[0]

    const product = await stripeServer.products.retrieve(
        price.product as string,
    )

    return createSubscription({
        id: subscription.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring.interval,
        status: subscription.status,
        userId: subscription.metadata.userId,
        customerId: subscription.customer as string,
    })
}

const handleSubscriptionUpdate = async (subscription: Stripe.Subscription) => {
    const {price} = subscription.items.data[0]

    const product = await stripeServer.products.retrieve(
        price.product as string,
    )

    return updateSubscription(subscription.id, {
        id: subscription.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring.interval,
        status: subscription.status,
        userId: subscription.metadata.userId,
        customerId: subscription.customer as string,
    })
}

const handleSubscriptionDelete = async (subscription: Stripe.Subscription) => {
    return deleteSubscription(subscription.id)
}

const stripeHandler: NextApiHandler = async (req, res) => {
    const body = await buffer(req)
    const stripeSignature = req.headers["stripe-signature"]

    let event: Stripe.Event

    try {
        event = stripeServer.webhooks.constructEvent(
            body,
            stripeSignature,
            process.env.STRIPE_WEBHOOK_SECRET_KEY,
        )
    } catch (error) {
        res.status(400).json({error: `Webhook Error: ${error.message}`})
        return
    }

    switch (event.type) {
        case "customer.subscription.created": {
            const subscription = event.data.object as Stripe.Subscription
            await handleSubscriptionCreate(subscription)

            break
        }

        case "customer.subscription.updated": {
            const subscription = event.data.object as Stripe.Subscription
            await handleSubscriptionUpdate(subscription)

            break
        }

        case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription
            await handleSubscriptionDelete(subscription)

            break
        }
    }

    res.status(200).json({received: true})
}

export default stripeHandler
export {config}
