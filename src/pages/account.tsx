import SEO from "@bradgarropy/next-seo"
import {withAuthRequired} from "@supabase/supabase-auth-helpers/nextjs"
import {useUser} from "@supabase/supabase-auth-helpers/react"
import Account from "components/Account"
import Layout from "components/Layout"
import {FC} from "react"

const AccountPage: FC = () => {
    const {user} = useUser()
    const subscription = null

    return (
        <Layout>
            <SEO title="account" />

            <h1>account</h1>
            <Account user={user} subscription={subscription} />
        </Layout>
    )
}

const getServerSideProps = withAuthRequired({redirectTo: "/signin"})

export default AccountPage
export {getServerSideProps}
