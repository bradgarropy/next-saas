import {
    supabaseClient,
    supabaseServerClient,
} from "@supabase/supabase-auth-helpers/nextjs"
import {GetServerSidePropsContext} from "next"
import {Todo} from "types/todo"

const createTodo = async (todo: Partial<Todo>) => {
    const {data: newTodo} = await supabaseClient
        .from<Todo>("todos")
        .insert(todo)
        .single()

    return newTodo
}

// TODO: define interface for api routes and getServerSideProps
const readAllTodos = async (context: GetServerSidePropsContext) => {
    const {data: todos} = await supabaseServerClient(context)
        .from<Todo>("todos")
        .select("*")
        .order("createdAt", {ascending: false})

    return todos
}

const updateTodo = async (id: Todo["id"], updates: Partial<Todo>) => {
    const {data: updatedTodo} = await supabaseClient
        .from("todos")
        .update(updates)
        .eq("id", id)
        .single()

    return updatedTodo
}

const deleteTodo = async (id: Todo["id"]) => {
    const {data: deletedTodo} = await supabaseClient
        .from<Todo>("todos")
        .delete()
        .eq("id", id)
        .single()

    return deletedTodo
}

export {createTodo, deleteTodo, readAllTodos, updateTodo}
