import SEO from "@bradgarropy/next-seo"
import AuthForm from "components/AuthForm"
import Layout from "components/Layout"
import {useRouter} from "next/router"
import {FC} from "react"
import {supabase} from "utils/supabase"

const SigninPage: FC = () => {
    const router = useRouter()

    const handleSignin = async (email: string, password: string) => {
        await supabase.auth.signIn({
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
