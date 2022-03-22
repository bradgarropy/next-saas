import {UserContext, UserContextType} from "context"
import {useContext} from "react"

const useUser = (): UserContextType => {
    const userCtx = useContext(UserContext)
    return userCtx
}

export default useUser
