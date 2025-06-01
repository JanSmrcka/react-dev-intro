import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo, TodoToggle } from '../types'
import { showToast } from '../helpers/toast.notification.helper.ts'

export const useTodoToggle = () => {
  const queryClient = useQueryClient()

  return useMutation<Todo, ApiError, TodoToggle>({
    mutationKey: ['toggleTodo'],
    mutationFn: async (todoToggle: TodoToggle) => {
      return await todoApi.toggleTodo(todoToggle)
    },
    onSuccess: () => {
      showToast("Todo toggled successfully", 'success');
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error) => {
      showToast(`Error toggling todo: ${error.message}`, 'error');
    },
  })
}
