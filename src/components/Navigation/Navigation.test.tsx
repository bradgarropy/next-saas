import {useUser} from "@supabase/supabase-auth-helpers/react"
import {render, screen} from "@testing-library/react"
import Navigation from "components/Navigation"
import {mockUser} from "test-utils/mocks"

jest.mock("@supabase/supabase-auth-helpers/react")

const mockUseUser = jest.mocked(useUser)

test("shows unauthenticated navigation", () => {
    mockUseUser.mockReturnValue({
        isLoading: false,
        user: null,
        accessToken: null,
    })

    render(<Navigation />)

    expect(screen.getByText("home"))
    expect(screen.getByText("signup"))
    expect(screen.getByText("signin"))
})

test("shows authenticated navigation", () => {
    mockUseUser.mockReturnValue({
        isLoading: false,
        user: mockUser,
        accessToken: "abc123",
    })

    render(<Navigation />)

    expect(screen.getByText("home"))
    expect(screen.getByText("todos"))
    expect(screen.getByText("account"))
    expect(screen.getByText("signout"))
})
