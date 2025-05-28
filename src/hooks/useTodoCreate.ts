import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  queryClient.invalidateQueries({ queryKey: ['todos'] })
  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: async (todoName: string) => {
      return todoApi.createTodo(todoName)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
