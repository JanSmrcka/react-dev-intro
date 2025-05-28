import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo } from '../types'

export const useTodoCreate = () => {
  const queryClient = useQueryClient()
  queryClient.invalidateQueries({ queryKey: ['todos'] })

  return useMutation<Todo, ApiError, string>({
    mutationKey: ['createTodo'],
    mutationFn: async (todoName: string) => {
      return await todoApi.createTodo(todoName)
    },
    onMutate: async (todoName) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData(['todos'], () => {
        return [
          ...(previousTodos || []),
          {
            name: todoName,
            id: Date.now(),
            completed: false,
          },
        ]
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
