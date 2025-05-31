import { useState, useMemo } from 'react'
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

      <div className="todo-container">
        <ul>
          {visibleTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
        {isLoading && <Spinner />}
      </div>
    </main>
  )
}
