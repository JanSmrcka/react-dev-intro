export type Todo = {
    id: number
    name: string
    completed: boolean
    description?: string
    priority?: number 
}

export type TodoToggle = Pick<Todo, 'id' | 'completed'>