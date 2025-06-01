import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error-message'
import { useTodosQuery } from '../../hooks/useTodosQuery'
import { SearchBar } from './search-bar'
import { useSearchParams } from 'react-router'

export const TodosSection = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  const handleSearch = (term: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (term) {
      newParams.set('search', term)
    } else {
      newParams.delete('search')
    }
    setSearchParams(newParams)
  }

  const filteredTodos = todos?.filter((todo) => todo.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <main>
      {error && <ErrorMessage message={error.message} onDissmis={refetch} />}
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
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
