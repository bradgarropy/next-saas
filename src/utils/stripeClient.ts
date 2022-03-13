import {loadStripe} from "@stripe/stripe-js"

const getStripeClient = () => {
    const stripeClientPromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    )

    return stripeClientPromise
}

export {getStripeClient}
