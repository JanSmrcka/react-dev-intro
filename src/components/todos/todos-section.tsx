import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error-message'
import { useTodosQuery } from '../../hooks/useTodosQuery'
import { SearchBar } from './search-bar'
import { useState } from 'react'

export const TodosSection = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTodos = todos?.filter((todo) => todo.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <main>
      {error && <ErrorMessage message={error.message} onDissmis={refetch} />}
      <SearchBar onSearch={setSearchTerm} />
      <TodoForm />
      <div className="todo-container">
        <ul>
          {filteredTodos?.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />
          })}
        </ul>
        {isLoading && <Spinner />}
      </div>
    </main>
  )
}
