import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../../api/todoApi'

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: async (name: string) => {
      return todoApi.createTodo(name)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
