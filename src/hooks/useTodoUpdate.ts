import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo, TodoCreate } from '../types'

export const useTodoUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<Todo, ApiError, { id: number; todo: Partial<TodoCreate> }>(
    {
      mutationKey: ['updateTodo'],
      mutationFn: async ({ id, todo }) => {
        return await todoApi.updateTodo(id, todo)
      },
      onSuccess: (updatedTodo) => {
        // Update the todos list
        queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => {
          return (oldTodos || []).map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          )
        })

        // Update individual todo cache
        queryClient.setQueryData<Todo>(
          ['todo', String(updatedTodo.id)],
          updatedTodo,
        )

        // Invalidate queries to ensure fresh data
        queryClient.invalidateQueries({ queryKey: ['todos'] })
        queryClient.invalidateQueries({
          queryKey: ['todo', String(updatedTodo.id)],
        })
      },
    },
  )
}
