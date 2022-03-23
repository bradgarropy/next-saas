import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Pricing from "components/Pricing"
import {mockBasicProduct, mockProducts} from "test-utils/mocks"

const mockCheckout = jest.fn()

test("shows products", () => {
    render(<Pricing products={mockProducts} onCheckout={mockCheckout} />)

    mockProducts.forEach(mockProduct => {
        expect(
            screen.getByText(
                `${mockProduct.name} $${mockProduct.price.amount}`,
            ),
        )
    })
})

test("redirects to checkout", () => {
    render(<Pricing products={mockProducts} onCheckout={mockCheckout} />)

    userEvent.click(
        screen.getByText(
            `${mockBasicProduct.name} $${mockBasicProduct.price.amount}`,
        ),
    )

    expect(mockCheckout).toHaveBeenCalledTimes(1)
    expect(mockCheckout).toHaveBeenCalledWith(mockBasicProduct)
})
