import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'
import { showToast } from '../helpers/toast.notification.helper.ts'

export const useTodoDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: async (id: number) => {
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
