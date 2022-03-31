import {post} from "@bradgarropy/http"
import {render, screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Account from "components/Account"
import {
    mockBasicSubscription,
    mockPremiumSubscription,
    mockUser,
} from "test-utils/mocks"

jest.mock("@bradgarropy/http")
const mockPost = jest.mocked(post)

global.window = Object.create(window)

Object.defineProperty(window, "location", {
    value: {
        href: "",
    },
})

test("shows no user information", () => {
    render(<Account user={null} subscription={null} />)

    expect(screen.getByText("Email"))
    expect(screen.queryByText(mockUser.email)).not.toBeInTheDocument()
})

test("shows user information", () => {
    render(<Account user={mockUser} subscription={null} />)

    expect(screen.getByText("Email"))
    expect(screen.getByText(mockUser.email))
})

test("shows no subscription", () => {
    render(<Account user={mockUser} subscription={null} />)

    expect(screen.getByText("Subscription"))
    expect(screen.getByText("No active", {exact: false}))
    expect(screen.getByText("subscription")).toHaveAttribute("href", "/")
})

test("shows basic subscription", () => {
    render(<Account user={mockUser} subscription={mockBasicSubscription} />)

    expect(screen.getByText("Subscription"))
    expect(screen.getByText(mockBasicSubscription.name))
    expect(screen.getByText("$2.99 / month"))
})

test("shows premium subscription", () => {
    render(<Account user={mockUser} subscription={mockPremiumSubscription} />)

    expect(screen.getByText("Subscription"))
    expect(screen.getByText(mockPremiumSubscription.name))
    expect(screen.getByText("$6.99 / month"))
})

test("redirects to customer portal", () => {
    mockPost.mockResolvedValue("https://checkout.stripe.com")

    render(<Account user={mockUser} subscription={mockBasicSubscription} />)

    userEvent.click(screen.getByText("change plan"))

    waitFor(() => {
        expect(window.location.href).toEqual("https://checkout.stripe.com")
    })
})
