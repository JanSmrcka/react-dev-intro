import { useMutation, useQueryClient } from "@tanstack/react-query"
import { todoApi } from "../api/todoApi"

export const useTodoToggle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['toggleTodo'],
        mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
            return todoApi.toggleTodo(id, completed)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })
}