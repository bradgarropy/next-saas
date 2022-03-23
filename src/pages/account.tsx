import SEO from "@bradgarropy/next-seo"
import Account from "components/Account"
import Layout from "components/Layout"
import {useUser} from "hooks"
import {useRouter} from "next/router"
import {FC, useEffect} from "react"

const AccountPage: FC = () => {
    const router = useRouter()
    const {user, subscription} = useUser()

    useEffect(() => {
        if (!user) {
            router.push("/signin")
            return
        }
    }, [user, router])

    return (
        <Layout>
            <SEO title="account" />

            <h1>account</h1>
            <Account user={user} subscription={subscription} />
        </Layout>
    )
}

export default AccountPage
