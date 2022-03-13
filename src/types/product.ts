import Stripe from "stripe"

type Product = {
    id: Stripe.Product["id"]
    name: Stripe.Product["name"]
    price: Price
}

type Price = {
    id: Stripe.Price["id"]
    amount: Stripe.Price["unit_amount"]
}

export type {Price, Product}
