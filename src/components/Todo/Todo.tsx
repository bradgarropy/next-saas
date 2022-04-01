import {
    CheckCircleIcon as IncompleteIcon,
    TrashIcon,
} from "@heroicons/react/outline"
import {CheckCircleIcon as CompleteIcon} from "@heroicons/react/solid"
import {FC} from "react"
import {Todo as TodoType} from "types/todo"

type TodoProps = {
    todo: TodoType
    onDelete: (id: TodoType["id"]) => Promise<void>
    onCompleted: (id: TodoType["id"]) => Promise<void>
}

const Todo: FC<TodoProps> = ({todo, onDelete, onCompleted}) => {
    return (
        <div className="grid grid-cols-todo items-center text-xl">
            <button
                className="grid border-none bg-none p-2"
                type="button"
                aria-label={todo.isCompleted ? "complete" : "incomplete"}
                onClick={() => onCompleted(todo.id)}
            >
                {todo.isCompleted ? (
                    <CompleteIcon className="w-6" />
                ) : (
                    <IncompleteIcon className="w-6" />
                )}
            </button>

            <span>{todo.name}</span>

            <button
                className="grid border-none bg-none p-2"
                type="button"
                aria-label="delete"
                onClick={() => onDelete(todo.id)}
            >
                <TrashIcon className="w-6" />
            </button>
        </div>
    )
}

export default Todo
