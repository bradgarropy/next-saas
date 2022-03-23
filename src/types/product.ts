import Stripe from "stripe"

type Product = {
    id: Stripe.Product["id"]
    name: Stripe.Product["name"]
    price: Price
}

type Price = {
    id: Stripe.Price["id"]
    amount: Stripe.Price["unit_amount"]
    interval: Stripe.Price.Recurring.Interval
}

export type {Price, Product}
