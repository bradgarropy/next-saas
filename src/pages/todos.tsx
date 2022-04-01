import Link from "@bradgarropy/next-link"
import SEO from "@bradgarropy/next-seo"
import {getUser, withAuthRequired} from "@supabase/supabase-auth-helpers/nextjs"
import Layout from "components/Layout"
import Todo from "components/Todo"
import TodoForm from "components/TodoForm"
import {GetServerSideProps} from "next"
import {FC, useState} from "react"
import {Todo as TodoType} from "types/todo"
import {readSubscriptionByUser} from "utils/subscriptions"
import {createTodo, deleteTodo, readAllTodos, updateTodo} from "utils/todos"

type TodosPageProps = {
    isSubscribed: boolean
    initialTodos: TodoType[]
}

const TodosPage: FC<TodosPageProps> = ({isSubscribed, initialTodos}) => {
    const [todos, setTodos] = useState(initialTodos)

    const handleAdd = async (todo: string) => {
        const newTodo = await createTodo({
            name: todo,
            isCompleted: false,
        })

        setTodos([newTodo, ...todos])
    }

    const handleCompleted = async (id: TodoType["id"]) => {
        const index = todos.findIndex(todo => todo.id === id)

        const updatedTodo = await updateTodo(id, {
            isCompleted: !todos[index].isCompleted,
        })

        const newTodos = [...todos]
        newTodos[index] = updatedTodo

        setTodos(newTodos)
    }

    const handleDelete = async (id: TodoType["id"]) => {
        const deletedTodo = await deleteTodo(id)
        setTodos(todos.filter(todo => todo.id !== deletedTodo.id))
    }

    return (
        <Layout>
            <SEO title="todos" />

            <h1 className="mb-6 text-4xl font-bold">todos</h1>

            {isSubscribed ? (
                <>
                    <TodoForm onSubmit={handleAdd} />

                    {todos.map(todo => {
                        return (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                onCompleted={handleCompleted}
                                onDelete={handleDelete}
                            />
                        )
                    })}
                </>
            ) : (
                <p>
                    You need a <Link to="/">subscription</Link> to track your
                    todos.
                </p>
            )}
        </Layout>
    )
}

const getProps: GetServerSideProps = async context => {
    const {user} = await getUser(context)
    const subscription = await readSubscriptionByUser(context, user.id)
    const todos = await readAllTodos(context)

    return {
        props: {
            isSubscribed: subscription?.status === "active",
            initialTodos: todos,
        },
    }
}

const getServerSideProps = withAuthRequired({
    redirectTo: "/signin",
    getServerSideProps: getProps,
})

export default TodosPage
export {getServerSideProps}
