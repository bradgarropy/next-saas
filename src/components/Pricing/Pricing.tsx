import {FC} from "react"
import {Product} from "types/product"

type PricingProps = {
    products: Product[]
    onCheckout: (product: Product) => Promise<void>
}

const Pricing: FC<PricingProps> = ({products, onCheckout}) => {
    return (
        <div className="grid grid-cols-2 gap-16">
            {products.map(product => {
                return (
                    <div
                        key={product.id}
                        className="rounded-2xl border-4 border-gray-500 p-8"
                    >
                        <h2 className="mb-4 text-2xl font-bold">
                            {product.name}
                        </h2>

                        <p>{`$${product.price.amount} / ${product.price.interval}`}</p>

                        <button
                            onClick={() => onCheckout(product)}
                            className="mt-10 w-full rounded-lg bg-gray-900 py-2 px-4 text-xl font-bold text-gray-50 transition-transform hover:scale-105"
                        >
                            {`Buy ${product.name}`}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default Pricing
