import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi, ApiError } from '../api/todoApi'
import type { Todo } from '../types'

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  queryClient.invalidateQueries({ queryKey: ['todos'] })
  return useMutation<Todo, ApiError, string, { previousTodos: Todo[] | undefined }>({
    mutationKey: ['createTodo'],
    mutationFn: async (todoName: string) => {
      return todoApi.createTodo(todoName)
    },
    // maybe async is problem?
    // same problem as with todoDelete - screen refreshes numerous times.
    onMutate: async (todoName) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return [
          ...(old || []),
          {
            name: todoName,
            id: Date.now(),
            completed: false,
          },
        ]
      })
      return { previousTodos }
    },
    onError: (err, variables, content) => {
      if (content?.previousTodos) {
        queryClient.setQueryData<Todo[]>(['todos'], content.previousTodos)
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
