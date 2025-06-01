import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'
import type { Todo } from '../types'

type TodoUpdate = {
  id: number
  name?: string
  description?: string
  priority?: number
  completed?: boolean
}

export const useTodoUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateTodo'],
    mutationFn: async (update: TodoUpdate) => {
      return todoApi.updateTodo(update)
    },
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      await queryClient.cancelQueries({
        queryKey: ['todo', String(variables.id)],
      })

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      const previousTodo = queryClient.getQueryData<Todo>(['todo', String(variables.id)])

      // Optimistically update the todo in the list
      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => {
        return (oldTodos || []).map((todo) => (todo.id === variables.id ? { ...todo, ...variables } : todo))
      })

      // Optimistically update the single todo
      if (previousTodo) {
        queryClient.setQueryData<Todo>(['todo', String(variables.id)], {
          ...previousTodo,
          ...variables,
        })
      }

      return { previousTodos, previousTodo }
    },
    onError: (_err, _variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
      if (context?.previousTodo) {
        queryClient.setQueryData(['todo', String(context.previousTodo.id)], context.previousTodo)
      }
    },
    onSettled: (_data, _error, variables) => {
      // Always refetch after error or success to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.invalidateQueries({
        queryKey: ['todo', String(variables.id)],
      })
    },
  })
}
