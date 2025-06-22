import { createContext } from 'react'
import type { Todo, TodoCreate } from '../types'
import type { RefetchOptions, QueryObserverResult } from '@tanstack/react-query'

type TodosContext = {
  todos: Todo[]
  isLoading: boolean
  error: string | null
  addTodo: (todoData: TodoCreate) => Promise<Todo>
  toggleTodo: (id: number, completed: boolean) => Promise<Todo>
  deleteTodo: (id: number) => Promise<unknown>
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<Todo[], Error>>
}

export const TodosContext = createContext<TodosContext | undefined>(undefined)
