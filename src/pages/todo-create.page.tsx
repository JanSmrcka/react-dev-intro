import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useTodoCreate } from '../hooks/useTodoCreate'
import type { TodoCreatePayload } from '../hooks/useTodoCreate'

export const TodoCreatePage = () => {
  const navigate = useNavigate()

  const { mutate: createTodo, status: createStatus, error } = useTodoCreate()
  const isCreating = createStatus === 'pending'

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<number>(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const payload: TodoCreatePayload = {
      name: name.trim(),
      description: description.trim() || undefined,
      priority: priority > 0 ? priority : undefined,
    }

    createTodo(payload, {
      onSuccess: () => {
        navigate('/')
      },
    })
  }

  return (
    <main className={`container fade-in ${mounted ? 'visible' : ''}`}>
      <div>
        <button
          type="button"
          className="text-button"
          onClick={() => navigate('/')}
        >
          ← Back to Dashboard
        </button>
      </div>

      <h1>Create New Todo</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="todo-name">Name (required):</label>
          <div className="input-group">
            <input
              id="todo-name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="todo-description">Description (optional):</label>
          <div className="input-group">
            <input
              id="todo-description"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="todo-priority">Priority (optional):</label>
          <div className="input-group">
            <input
              id="todo-priority"
              type="number"
              placeholder="1, 2, 3…"
              value={priority}
              min={1}
              step={1}
              onChange={(e) => {
                const parsed = Number(e.target.value)
                setPriority(isNaN(parsed) ? 1 : parsed)
              }}
            />
          </div>
        </div>

        <div>
          <button type="submit" disabled={isCreating} className="btn-create">
            {isCreating ? 'Creating…' : 'Create Todo'}
          </button>
        </div>

        {error && (
          <div className="error-message" style={{ marginTop: '1rem' }}>
            {(error as Error).message}
          </div>
        )}
      </form>
    </main>
  )
}

export default TodoCreatePage
