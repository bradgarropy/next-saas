import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Navigation from "components/Navigation"
import {useUser} from "hooks"
import {mockUser, mockUserCtx} from "test-utils/mocks"
import {supabase} from "utils/supabase"

jest.mock("utils/supabase", () => {
    return {
        supabase: {
            auth: {
                signOut: jest.fn(),
            },
        },
    }
})

jest.mock("next/router", () => {
    return {
        useRouter: () => {
            return {
                push: () => jest.fn(),
            }
        },
    }
})

jest.mock("hooks/useUser")

const mockUseUser = jest.mocked(useUser)
const mockAuthSignOut = jest.mocked(supabase.auth.signOut)

test("shows unauthenticated navigation", () => {
    mockUseUser.mockReturnValue({...mockUserCtx, user: null})
    render(<Navigation />)

    expect(screen.getByText("home"))
    expect(screen.getByText("signup"))
    expect(screen.getByText("signin"))
})

test("shows authenticated navigation", () => {
    mockUseUser.mockReturnValue(mockUserCtx)

    render(<Navigation />)

    expect(screen.getByText("home"))
    expect(screen.getByText("todos"))
    expect(screen.getByText("signout"))
})

test("signs out", () => {
    mockUseUser.mockReturnValue(mockUserCtx)

    render(<Navigation />)

    userEvent.click(screen.getByText("signout"))
    expect(mockAuthSignOut).toHaveBeenCalledTimes(1)
})
