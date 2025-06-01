import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi, ApiError } from '../api/todoApi'
import type { Todo } from '../types'

type TodoInput = {
  name: string
  description?: string
  priority?: number
}

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<Todo, ApiError, TodoInput, { previousTodos: Todo[] | undefined }>({
    mutationKey: ['createTodo'],
    mutationFn: async (todoInput: TodoInput) => {
      return todoApi.createTodo(todoInput)
    },
    // maybe async is problem?
    // same problem as with todoDelete - screen refreshes numerous times.
    onMutate: async (todoInput) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return [
          ...(old || []),
          {
            name: todoInput.name,
            description: todoInput.description || '',
            priority: todoInput.priority || 1,
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
  })
}
