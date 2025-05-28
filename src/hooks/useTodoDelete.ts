import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'

export const useTodoDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: async (id: number) => {
      return todoApi.deleteTodo(id)
    },
    onSuccess: () => {
      // When i call todoDelete, the system refetches todos like 8 times. The refetch shloud occur just once. TODO: fix.
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
