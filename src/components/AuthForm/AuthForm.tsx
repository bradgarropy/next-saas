import {FC, FormEventHandler, useState} from "react"

type AuthFormProps = {
    type: "signin" | "signup"
    onSubmit: (email: string, password: string) => Promise<void>
}

const AuthForm: FC<AuthFormProps> = ({type, onSubmit}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault()
        onSubmit(email, password)
    }

    return (
        <form className="grid grid-cols-form gap-4" onSubmit={handleSubmit}>
            <label className="self-center justify-self-end" htmlFor="email">
                email
            </label>

            <input
                id="email"
                type="email"
                value={email}
                autoComplete="email"
                className="rounded-lg border-2 border-gray-900 py-2 px-4 text-base"
                onChange={event => setEmail(event.target.value)}
            />

            <label className="self-center justify-self-end" htmlFor="password">
                password
            </label>

            <input
                id="password"
                type="password"
                value={password}
                autoComplete={
                    type === "signin" ? "current-password" : "new-password"
                }
                className="rounded-lg border-2 border-gray-900 py-2 px-4 text-base"
                onChange={event => setPassword(event.target.value)}
            />

            <button
                className="col-start-2 rounded-lg border-2 border-gray-900 bg-gray-900 py-2 px-4 text-xl font-bold text-gray-50 transition-transform hover:scale-105"
                type="submit"
            >
                {type}
            </button>
        </form>
    )
}

export default AuthForm
