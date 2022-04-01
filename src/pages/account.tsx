import SEO from "@bradgarropy/next-seo"
import {getUser, withAuthRequired} from "@supabase/supabase-auth-helpers/nextjs"
import {User} from "@supabase/supabase-js"
import Account from "components/Account"
import Layout from "components/Layout"
import {GetServerSideProps} from "next"
import {FC} from "react"
import {Subscription} from "types/subscription"
import {readSubscriptionByUser} from "utils/subscriptions"

type AccountPageProps = {
    user: User
    subscription: Subscription
}

const AccountPage: FC<AccountPageProps> = ({user, subscription}) => {
    return (
        <Layout>
            <SEO title="account" />

            <h1 className="mb-6 text-4xl font-bold">account</h1>
            <Account user={user} subscription={subscription} />
        </Layout>
    )
}

const getProps: GetServerSideProps = async context => {
    const {user} = await getUser(context)
    const subscription = await readSubscriptionByUser(context, user.id)

    return {
        props: {
            subscription,
        },
    }
}

const getServerSideProps = withAuthRequired({
    redirectTo: "/signin",
    getServerSideProps: getProps,
})

export default AccountPage
export {getServerSideProps}
