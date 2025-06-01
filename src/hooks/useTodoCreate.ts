import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'
import { showToast } from '../helpers/toast.notification.helper.ts'

interface CreateTodoPayload {
  name: string
  priority: number
  description: string
}

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: async ({ name, priority, description }: CreateTodoPayload) => {
      return await todoApi.createTodo(name, priority, description)
    },
    onSuccess: () => {
      showToast("Todo created successfully", 'success')
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error: any) => {
      showToast(`Error creating todo: ${error.message}`, 'error')
    },
  })
}
