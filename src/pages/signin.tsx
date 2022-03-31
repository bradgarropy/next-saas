import SEO from "@bradgarropy/next-seo"
import {supabaseClient} from "@supabase/supabase-auth-helpers/nextjs"
import AuthForm from "components/AuthForm"
import Layout from "components/Layout"
import {useRouter} from "next/router"
import {FC} from "react"

const SigninPage: FC = () => {
    const router = useRouter()

    const handleSignin = async (email: string, password: string) => {
        await supabaseClient.auth.signIn({
            email,
            password,
        })

        router.push("/todos")
    }

    return (
        <Layout>
            <SEO title="signin" />

            <h1>signin</h1>
            <AuthForm type="signin" onSubmit={handleSignin} />
        </Layout>
    )
}

export default SigninPage
