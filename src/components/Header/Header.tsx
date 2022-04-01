import Navigation from "components/Navigation"
import {FC} from "react"

const Header: FC = () => {
    return (
        <header className="px-8 py-5 shadow-lg">
            <div className="m-auto max-w-5xl">
                <Navigation />
            </div>
        </header>
    )
}

export default Header
