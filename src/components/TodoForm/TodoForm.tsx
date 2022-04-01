import {FC, FormEventHandler, useState} from "react"

type TodoFormProps = {
    onSubmit: (todo: string) => Promise<void>
}

const TodoForm: FC<TodoFormProps> = ({onSubmit}) => {
    const [todo, setTodo] = useState("")

    const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault()
        onSubmit(todo)
        setTodo("")
    }

    return (
        <form
            className="mb-8 grid grid-flow-col gap-x-4"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={todo}
                aria-label="todo"
                className="rounded-lg border-2 border-gray-900 py-2 px-4"
                onChange={event => setTodo(event.target.value)}
            />

            <button
                className="rounded-lg  bg-gray-900 py-2 px-4 font-bold text-gray-50 transition-transform hover:scale-105"
                type="submit"
            >
                add
            </button>
        </form>
    )
}

export default TodoForm
