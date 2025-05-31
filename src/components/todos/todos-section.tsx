// src/components/todos/todos-section.tsx
import { useState, useMemo, useEffect } from 'react'
import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error-message'
import { useTodosQuery } from '../../hooks/useTodosQuery'

export const TodosSection = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery()
  const [filterTerm, setFilterTerm] = useState('')

  const visibleTodos = useMemo(() => {
    if (!todos) return []
    const term = filterTerm.trim().toLowerCase()
    if (term === '') {
      return todos
    }
    return todos.filter((t) => t.name.toLowerCase().includes(term))
  }, [todos, filterTerm])

  const [shouldRender, setShouldRender] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    if (visibleTodos.length > 0) {
      setShouldRender(true)
      setIsFadingOut(false)
    } else if (shouldRender) {
      setIsFadingOut(true)
      const timeout = setTimeout(() => {
        setShouldRender(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [visibleTodos.length, shouldRender])

  return (
    <main className="container">
      {error && <ErrorMessage message={error.message} onDismiss={refetch} />}

      <TodoForm />

      <div className="input-group">
        <input
          type="text"
          placeholder="Search todos by name…"
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
        />
      </div>

      {shouldRender && (
        <div
          className={`todo-container ${isFadingOut ? 'fade-out' : 'fade-in'}`}
        >
          <ul>
            {visibleTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
          {isLoading && <Spinner />}
        </div>
      )}

      {!shouldRender && isLoading && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Spinner />
        </div>
      )}
    </main>
  )
}
