import "../styles/styles.css"

import SEO from "@bradgarropy/next-seo"
import {UserProvider} from "context"
import type {AppProps} from "next/app"
import Head from "next/head"
import {ReactElement, useEffect} from "react"

import pkg from "../../package.json"

const App = ({Component, pageProps}: AppProps): ReactElement => {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js")
        }
    }, [])

    return (
        <>
            <Head>
                <meta name="theme-color" content="#ffffff" />
                <meta name="viewport" content="viewport-fit=cover" />
                <link rel="manifest" href="/manifest.json" />
            </Head>

            <SEO
                title={pkg.name}
                description={pkg.description}
                keywords={pkg.keywords}
                icon="/favicon.ico"
                facebook={{
                    image: "https://next-todo.bradgarropy.vercel.app/facebook.png",
                    url: "https://next-todo.bradgarropy.vercel.app",
                    type: "website",
                }}
                twitter={{
                    image: "https://next-todo.bradgarropy.vercel.app/twitter.png",
                    site: "@bradgarropy",
                    card: "summary",
                }}
            />

            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </>
    )
}

export default App
