import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo, TodoCreate } from '../types'

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<
    Todo,
    ApiError,
    TodoCreate,
    { previousTodos: Todo[] | undefined }
  >({
    mutationKey: ['createTodo'],
    mutationFn: async (todo: TodoCreate) => {
      return await todoApi.createTodo(todo)
    },
    onMutate: async (todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return [
          ...(old || []),
          {
            ...todo,
            id: Date.now(),
            completed: false,
          },
        ]
      })

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
