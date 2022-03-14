import type {NextApiHandler} from "next"
import {stripeServer} from "utils/stripeServer"

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

    switch (event.type) {
        case "checkout.session.completed": {
            console.log("checkout.session.completed")
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

    res.status(200).json({message: "stripeHandler"})
}

export default stripeHandler
export {config}
