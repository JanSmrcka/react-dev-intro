import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'
import type { Todo } from '../types'

export const useTodoToggle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['toggleTodo'],
    mutationFn: async (todo: Todo) => {
      return todoApi.toggleTodo(todo.id, !todo.completed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
