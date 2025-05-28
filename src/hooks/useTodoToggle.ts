import { useMutation, useQueryClient } from "@tanstack/react-query"
import { todoApi } from "../api/todoApi"

export const useTodoToggle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["toggleTodo"],
    mutationFn: async ({ todoId, completed }: { todoId: number; completed: boolean }) => {
      return await todoApi.toggleTodo(todoId, completed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
}