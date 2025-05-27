import type { Todo } from '../types'

const API_URL = 'https://eli-workshop.vercel.app/api/users/braj15/todos'

class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(`api failed ${response.status}`)
  }
  const data = await response.json()
  return data
}

export const todoApi = {
  async fetchTodos(): Promise<Todo[]> {
    const response = await fetch(API_URL)
    return handleResponse<Todo[]>(response)
  },
  async fetchTodo(id?: number): Promise<Todo> {
    const response = await fetch(`${API_URL}/${id}`)
    return handleResponse<Todo>(response)
  },
  async createTodo(newTodo: string) {
    const body = {
      name: newTodo,
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return handleResponse<Todo>(response)
  },

  async toggleTodo(id: number, isToggled: boolean) {
    const body = {
      completed: isToggled,
    }
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return handleResponse<Todo>(response)
  },

  async deleteTodo(todoId: number) {
    const response = await fetch(`${API_URL}/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return handleResponse<Todo>(response)
  },
}
