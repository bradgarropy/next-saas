import {FC} from "react"
import {Product} from "types/product"

import PricingStyles from "./Pricing.module.css"

type PricingProps = {
    products: Product[]
    onCheckout: (product: Product) => Promise<void>
}

const Pricing: FC<PricingProps> = ({products, onCheckout}) => {
    return (
        <div className={PricingStyles.pricing}>
            {products.map(product => {
                return (
                    <div key={product.id} className={PricingStyles.card}>
                        <h2 className={PricingStyles.title}>{product.name}</h2>
                        <p>{`$${product.price.amount} / ${product.price.interval}`}</p>

                        <button
                            onClick={() => onCheckout(product)}
                            className={PricingStyles.buy}
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
