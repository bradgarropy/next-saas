import {Session, User} from "@supabase/supabase-js"
import {createContext, FC, useEffect, useState} from "react"
import {Subscription} from "types/subscription"
import {readSubscriptionByUser} from "utils/subscriptions"
import {supabase} from "utils/supabase"

type UserContextType = {
    user: User
    token: Session["access_token"]
    subscription: Subscription
}

const UserContext = createContext({} as UserContextType)

const UserProvider: FC = ({children}) => {
    const [session, setSession] = useState(supabase.auth.session())
    const [subscription, setSubscription] = useState<Subscription>(null)

    useEffect(() => {
        const fetch = async () => {
            const newSubscription = await readSubscriptionByUser(
                session?.user.id,
            )
            setSubscription(newSubscription)
        }

        if (session?.user.id) {
            fetch()
        }
    }, [session?.user.id])

    supabase.auth.onAuthStateChange((event, session) => {
        setSession(session)
    })

    const context: UserContextType = {
        user: session?.user ?? null,
        token: session?.access_token ?? null,
        subscription,
    }

    return (
        <UserContext.Provider value={context}>{children}</UserContext.Provider>
    )
}

export {UserContext, UserProvider}
export type {UserContextType}
