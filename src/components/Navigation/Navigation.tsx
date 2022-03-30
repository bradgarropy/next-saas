import Link from "@bradgarropy/next-link"
import {useUser} from "@supabase/supabase-auth-helpers/react"
import {FC} from "react"

import NavigationStyles from "./Navigation.module.css"

const Navigation: FC = () => {
    // TODO: fix unauthenticated flash
    const {user} = useUser()

    return (
        <nav className={NavigationStyles.navigation}>
            <div className={NavigationStyles.navSection}>
                <Link to="/" className={NavigationStyles.link}>
                    home
                </Link>

                {user ? (
                    <Link to="/todos" className={NavigationStyles.link}>
                        todos
                    </Link>
                ) : null}
            </div>

            {user ? (
                <div className={NavigationStyles.navSection}>
                    <Link to="/account" className={NavigationStyles.link}>
                        account
                    </Link>

                    <Link
                        to="/api/auth/logout"
                        className={NavigationStyles.link}
                    >
                        signout
                    </Link>
                </div>
            ) : (
                <div className={NavigationStyles.navSection}>
                    <Link to="/signup" className={NavigationStyles.link}>
                        signup
                    </Link>

                    <Link to="/signin" className={NavigationStyles.link}>
                        signin
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Navigation
