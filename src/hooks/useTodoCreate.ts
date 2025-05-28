import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiError, todoApi } from "../api/todoApi"
import type { Todo } from "../types"

export const useTodoCreate = () => {
    const queryClient = useQueryClient()
    return useMutation<Todo, ApiError, string, {previousTodos: Todo[] | undefined }>({
        mutationKey: ['createTodo'],
        mutationFn: async (todoName : string)=> {
            return todoApi.createTodo(todoName)
},
onMutate: async (todoName) => {
    const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

    queryClient.setQueryData<Todo[]>(["todos"], (old)=>{
        return [
            ...((Array.isArray(old) ? old : []) || []),
            {
            name: todoName,
            id: Date.now(),
            completed: false
        }]
    })
    return { previousTodos }
},
onError: (err, variables,context) => {
    if(context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
    }
},
onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
}

})}