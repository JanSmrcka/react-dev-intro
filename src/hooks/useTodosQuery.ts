import { useSuspenseQuery } from "@tanstack/react-query"
import { todoApi } from "../api/todoApi"

export const useTodosQuery = () => {

    return useSuspenseQuery({
        queryKey: ['todos'],
        queryFn: () => {
            return todoApi.fetchTodos()
        },
    })
}