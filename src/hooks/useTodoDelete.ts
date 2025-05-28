import { useMutation, useQueryClient } from "@tanstack/react-query"
import { todoApi } from "../api/todoApi"

export const  useTodoDelete = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationKey: ["deleteTodo"],
        mutationFn: async (todoId: number)=>{
            return await todoApi.deleteTodo(todoId)
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["todos"]})
        }
    })
}