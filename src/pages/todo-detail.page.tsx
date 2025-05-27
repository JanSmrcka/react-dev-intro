import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { todoApi } from '../api/todoApi'
import type { Todo } from '../types'
import { Spinner } from '../components/spinner'

const TodoDetailPage = () => {
  const params = useParams()

  const [todo, setTodo] = useState<Todo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    if (!params.id) return
    setLoading(true)
    todoApi
      .fetchTodoDetail(Number(params.id))
      .then(setTodo)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return <Spinner />
  }
  if (error) return <div>Error: {error}</div>
  if (!todo) return <div>No todo found.</div>

  return (
    <div>
      <h1>Todo Detail Page</h1>
      <p>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Name:</strong> {todo.name}
      </p>
      <p>
        <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Description:</strong> {todo.description || 'No description provided'}
      </p>
      <p>
        <strong>Priority:</strong> {todo.priority !== undefined ? todo.priority : 'No priority set'}
      </p>
    </div>
  )
}

export default TodoDetailPage
