export type Todo = {
  id: number
  name: string
  completed: boolean
  description?: string
  priority?: number
  createdAt?: string
  updatedAt?: string
  userId?: string
}

export type TodoCreate = {
  name: string
  description?: string
  priority?: number
}

export type TodoToggle = Pick<Todo, 'id' | 'completed'>
