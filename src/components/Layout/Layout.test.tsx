import {useUser} from "@supabase/supabase-auth-helpers/react"
import {render, screen} from "@testing-library/react"
import Layout from "components/Layout"

jest.mock("@supabase/supabase-auth-helpers/react")

const mockUseUser = jest.mocked(useUser)

test("shows layout", () => {
    mockUseUser.mockReturnValue({
        isLoading: false,
        user: null,
        accessToken: null,
    })

    render(
        <Layout>
            <p>testing</p>
        </Layout>,
    )

    expect(screen.getByText("home"))
    expect(screen.getByText("signup"))
    expect(screen.getByText("signin"))
    expect(screen.getByText("testing"))
})
