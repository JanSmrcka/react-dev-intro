import { useState } from 'react'
import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error-message'
import { useTodosQuery } from '../../hooks/useTodosQuery'

export const TodosSection = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery()
  const [priorityFilter, setPriorityFilter] = useState('')
  const [search, setSearch] = useState('')

  const filteredTodos = todos?.filter((todo) => {
    const matchPriority = priorityFilter ? todo.priority === Number(priorityFilter) : true
    const matchSearch = todo.name.toLowerCase().includes(search.toLowerCase())
    return matchPriority && matchSearch
  })

  const sortedTodos = filteredTodos?.slice().sort((a, b) => {
    return (b.priority ?? 0) - (a.priority ?? 0)
  })

  const activeTodos = sortedTodos?.filter((t) => !t.completed) ?? []
  const completedTodos = sortedTodos?.filter((t) => t.completed) ?? []

  return (
    <main>
      {error && <ErrorMessage message={error.message} onDismiss={refetch} />}
      <TodoForm />
      <div className="filters">
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="todo-container">
        <h2>Todo ({activeTodos.length})</h2>
        <ul>
          {activeTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
        <hr className="todos-separator" />
        <h2>Hotovo ({completedTodos.length})</h2>
        <ul>
          {completedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
        {isLoading && <Spinner />}
      </div>
    </main>
  )
}
