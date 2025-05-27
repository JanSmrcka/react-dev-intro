import { createContext } from 'react'
import type { Todo } from '../types'

type TodoContext = {
  todos: Todo[]
  isLoading: boolean
  error: string | null
  addTodo: (todoName: string) => Promise<void>
  toggleTodo: (todo: Todo) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
  refetch: () => Promise<void>
  fetchTodo: (todoId: number) => Promise<Todo>
}

export const TodosContext = createContext<TodoContext | undefined>(undefined)
