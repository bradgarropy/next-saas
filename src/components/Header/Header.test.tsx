import {render, screen} from "@testing-library/react"
import Header from "components/Header"
import {useUser} from "hooks"
import {mockUserCtx} from "test-utils/mocks"

jest.mock("utils/supabase", () => {
    return {
        supabase: {
            auth: {
                signout: jest.fn(),
            },
        },
    }
})

jest.mock("hooks")
const mockUseUser = jest.mocked(useUser)

test("shows unauthenticated header", () => {
    mockUseUser.mockReturnValue({...mockUserCtx, user: null})

    render(<Header />)

    expect(screen.getByText("home"))
    expect(screen.getByText("signup"))
    expect(screen.getByText("signin"))
})

test("shows authenticated header", () => {
    mockUseUser.mockReturnValue(mockUserCtx)

    render(<Header />)

    expect(screen.getByText("home"))
    expect(screen.getByText("todos"))
    expect(screen.getByText("signout"))
})
