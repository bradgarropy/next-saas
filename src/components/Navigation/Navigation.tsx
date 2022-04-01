import Link from "@bradgarropy/next-link"
import {useUser} from "@supabase/supabase-auth-helpers/react"
import {FC} from "react"

const Navigation: FC = () => {
    // TODO: fix unauthenticated flash
    const {user} = useUser()

    return (
        <nav className="grid grid-flow-col justify-between">
            <div className="grid grid-flow-col gap-x-12">
                <Link to="/" className="text-gray-900 hover:text-gray-500">
                    home
                </Link>

                {user ? (
                    <Link
                        to="/todos"
                        className="text-gray-900 hover:text-gray-500"
                    >
                        todos
                    </Link>
                ) : null}
            </div>

            {user ? (
                <div className="grid grid-flow-col gap-x-12">
                    <Link
                        to="/account"
                        className="text-gray-900 hover:text-gray-500"
                    >
                        account
                    </Link>

                    <Link
                        to="/api/auth/logout"
                        className="text-gray-900 hover:text-gray-500"
                    >
                        signout
                    </Link>
                </div>
            ) : (
                <div className="grid grid-flow-col gap-x-12">
                    <Link
                        to="/signup"
                        className="text-gray-900 hover:text-gray-500"
                    >
                        signup
                    </Link>

                    <Link
                        to="/signin"
                        className="text-gray-900 hover:text-gray-500"
                    >
                        signin
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Navigation
