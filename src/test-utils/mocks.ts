import {User} from "@supabase/supabase-js"
import {UserContextType} from "context"
import {Subscription} from "types/subscription"
import {Todo} from "types/todo"

const mockTodos: Todo[] = [
    {
        createdAt: "2022-01-01T00:00:00.000Z",
        id: 1,
        isCompleted: true,
        name: "complete todo",
        userId: "abc123",
    },
    {
        createdAt: "2022-01-02T00:00:00.000Z",
        id: 2,
        isCompleted: false,
        name: "incomplete todo",
        userId: "abc123",
    },
]

const mockTodo: Todo = mockTodos[0]
const mockCompleteTodo: Todo = mockTodos[0]
const mockIncompleteTodo: Todo = mockTodos[1]

const mockUser: User = {
    app_metadata: {
        provider: "email",
    },
    aud: "authenticated",
    created_at: "2022-03-01T00:00:00.00000Z",
    email: "me@example.com",
    id: "abc123",
    user_metadata: {},
}

const mockBasicSubscription: Subscription = {
    id: "abc123",
    name: "Basic",
    price: 299,
    interval: "month",
    status: "active",
    customerId: "cus_abc123",
    userId: mockUser.id,
    createdAt: "00:00:00",
}

const mockPremiumSubscription: Subscription = {
    id: "abc123",
    name: "Premium",
    price: 699,
    interval: "month",
    status: "active",
    customerId: "cus_abc123",
    userId: mockUser.id,
    createdAt: "00:00:00",
}

const mockUserCtx: UserContextType = {
    user: mockUser,
    token: "abc123",
    subscription: mockBasicSubscription,
}

export {
    mockBasicSubscription,
    mockCompleteTodo,
    mockIncompleteTodo,
    mockPremiumSubscription,
    mockTodo,
    mockTodos,
    mockUser,
    mockUserCtx,
}
