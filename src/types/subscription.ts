import Stripe from "stripe"

type Subscription = {
    id: string
    name: string
    price: number
    interval: string
    status: Stripe.Subscription.Status
    customerId: string
    userId: string
    createdAt: string
}

export type {Subscription}
