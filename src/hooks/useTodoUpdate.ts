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
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      await queryClient.cancelQueries({
        queryKey: ['todo', String(variables.id)],
      })

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      const previousTodo = queryClient.getQueryData<Todo>(['todo', String(variables.id)])

      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => {
        return (oldTodos || []).map((todo) => (todo.id === variables.id ? { ...todo, ...variables } : todo))
      })

      if (previousTodo) {
        queryClient.setQueryData<Todo>(['todo', String(variables.id)], {
          ...previousTodo,
          ...variables,
        })
      }

      return { previousTodos, previousTodo }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
      if (context?.previousTodo) {
        queryClient.setQueryData(['todo', String(context.previousTodo.id)], context.previousTodo)
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.invalidateQueries({
        queryKey: ['todo', String(variables.id)],
      })
    },
  })
}
