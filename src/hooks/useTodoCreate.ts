import { useMutation } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'

export const useTodoCreate = () => {
  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: async (todoName: string) => {
      return todoApi.createTodo(todoName)
    },
  })
}
