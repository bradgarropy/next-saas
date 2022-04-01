import Header from "components/Header"
import {FC} from "react"

const Layout: FC = ({children}) => {
    return (
        <div className="grid h-screen grid-rows-layout">
            <Header />
            <div className="m-auto max-w-5xl">{children}</div>
        </div>
    )
}

export default Layout
