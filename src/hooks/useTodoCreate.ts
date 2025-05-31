// src/hooks/useTodoCreate.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo } from '../types'

export type TodoCreatePayload = {
  name: string
  description?: string
  priority?: number
}

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<
    Todo,
    ApiError,
    TodoCreatePayload,
    { previousTodos?: Todo[] }
  >({
    mutationKey: ['createTodo'],
    mutationFn: async (payload: TodoCreatePayload) => {
      return await todoApi.createTodo(payload)
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => [
        ...old,
        {
          id: Date.now(),
          name: payload.name,
          completed: false,
          description: payload.description,
          priority: payload.priority,
        },
      ])

      return { previousTodos }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
