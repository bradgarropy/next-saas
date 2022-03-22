import Link from "@bradgarropy/next-link"
import classNames from "classnames"
import {useUser} from "hooks"
import {useRouter} from "next/router"
import {FC} from "react"
import {supabase} from "utils/supabase"

import NavigationStyles from "./Navigation.module.css"

const Navigation: FC = () => {
    const {user} = useUser()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/")
    }

    return (
        <nav className={NavigationStyles.navigation}>
            <Link to="/" className={NavigationStyles.link}>
                home
            </Link>

            {user ? (
                <>
                    <Link to="/todos" className={NavigationStyles.link}>
                        todos
                    </Link>

                    <Link to="/account" className={NavigationStyles.link}>
                        account
                    </Link>

                    <button
                        className={classNames(
                            NavigationStyles.logout,
                            NavigationStyles.link,
                        )}
                        onClick={handleLogout}
                    >
                        logout
                    </button>
                </>
            ) : (
                <>
                    <Link to="/signup" className={NavigationStyles.link}>
                        signup
                    </Link>

                    <Link to="/signin" className={NavigationStyles.link}>
                        signin
                    </Link>
                </>
            )}
        </nav>
    )
}

export default Navigation
