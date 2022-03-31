import {useUser} from "@supabase/supabase-auth-helpers/react"
import {render, screen} from "@testing-library/react"
import Header from "components/Header"
import {mockUser} from "test-utils/mocks"

jest.mock("@supabase/supabase-auth-helpers/react")

const mockUseUser = jest.mocked(useUser)

test("shows unauthenticated header", () => {
    mockUseUser.mockReturnValue({
        isLoading: false,
        user: null,
        accessToken: null,
    })

    render(<Header />)

    expect(screen.getByText("home"))
    expect(screen.getByText("signup"))
    expect(screen.getByText("signin"))
})

test("shows authenticated header", () => {
    mockUseUser.mockReturnValue({
        isLoading: false,
        user: mockUser,
        accessToken: null,
    })

    render(<Header />)

    expect(screen.getByText("home"))
    expect(screen.getByText("todos"))
    expect(screen.getByText("account"))
    expect(screen.getByText("signout"))
})
