import StripeServer from "stripe"

const stripeServer = new StripeServer(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
})

export {stripeServer}
