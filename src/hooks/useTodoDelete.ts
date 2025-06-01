import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'
import { showToast } from '../helpers/toast.notification.helper.ts'
import type { Todo } from '../types.ts'

export const useTodoDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: async (id: number) => {
      // Do optimistic update here
      const previousTodos: Todo[] = queryClient.getQueryData(['todos']) || [];
      if (previousTodos) {
        const filteredTodos = previousTodos.filter(todo => todo.id !== id);
        queryClient.setQueryData(['todos'], [...filteredTodos])
      }
      
      return await todoApi.deleteTodo(id)
    },
    onSuccess: () => {
      showToast("Todo deleted successfully", 'success');
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error) => {
      showToast(`Error deleting todo: ${error.message}`, 'error');
    },
  })
}
