import {FC} from "react"
import {Product} from "types/product"

import styles from "./Pricing.module.css"

type PricingProps = {
    products: Product[]
    onCheckout: (product: Product) => Promise<void>
}

const Pricing: FC<PricingProps> = ({products, onCheckout}) => {
    return (
        <div className={styles.pricing}>
            {products.map(product => {
                return (
                    <button
                        key={product.id}
                        onClick={() => onCheckout(product)}
                    >
                        {`${product.name} $${product.price.amount}`}
                    </button>
                )
            })}
        </div>
    )
}

export default Pricing
