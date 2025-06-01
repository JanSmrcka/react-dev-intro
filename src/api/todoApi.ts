import type { Todo, TodoToggle } from '../types'

type TodoInput = {
  name: string
  description?: string
  priority?: number
}

type TodoUpdate = {
  id: number
  name?: string
  description?: string
  priority?: number
}

const API_URL = 'https://eli-workshop.vercel.app/api/users/hana15/todos'

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Api error in Todo app'
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(`Api request failed ${response.status}`)
  }
  const data = await response.json()
  return data
}

export const todoApi = {
  // fetch all todos
  async fetchTodos() {
    const response = await fetch(API_URL)
    return handleResponse<Todo[]>(response)
  },

  // fetch single todo
  async fetchTodo(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
    })
    return handleResponse<Todo>(response)
  },

  async createTodo(todoInput: TodoInput) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoInput),
    })
    return handleResponse<Todo>(response)
  },

  async updateTodo(update: TodoUpdate) {
    const response = await fetch(`${API_URL}/${update.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
    return handleResponse<Todo>(response)
  },

  async deleteTodo(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    return handleResponse<Todo>(response)
  },

  async toggleTodo({ id, completed }: TodoToggle) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    })
    return handleResponse<Todo>(response)
  },
}
