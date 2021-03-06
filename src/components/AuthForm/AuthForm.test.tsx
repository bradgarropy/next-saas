import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AuthForm from "components/AuthForm"

const mockOnSubmit = jest.fn()

test("shows signin form", () => {
    render(<AuthForm type="signin" onSubmit={mockOnSubmit} />)
    expect(screen.getByText("email"))
    expect(screen.getByText("password"))
    expect(screen.getByText("signin"))
})

test("shows signup form", () => {
    render(<AuthForm type="signup" onSubmit={mockOnSubmit} />)
    expect(screen.getByText("email"))
    expect(screen.getByText("password"))
    expect(screen.getByText("signup"))
})

test("accepts email and password input", () => {
    render(<AuthForm type="signin" onSubmit={mockOnSubmit} />)

    userEvent.type(screen.getByLabelText("email"), "me@gmail.com")
    userEvent.type(screen.getByLabelText("password"), "secret")

    expect(screen.getByLabelText("email")).toHaveValue("me@gmail.com")
    expect(screen.getByLabelText("password")).toHaveValue("secret")
})

test("submits the authentication form", () => {
    render(<AuthForm type="signin" onSubmit={mockOnSubmit} />)

    userEvent.type(screen.getByLabelText("email"), "me@gmail.com")
    userEvent.type(screen.getByLabelText("password"), "secret")
    userEvent.click(screen.getByText("signin"))

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith("me@gmail.com", "secret")
})
