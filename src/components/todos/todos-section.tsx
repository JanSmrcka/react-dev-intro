import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { useTodoContext } from '../../hooks/useTodosContext'
import { ErrorMessage } from '../error-message'

export const TodosSection = () => {
  const { isLoading, todos, error, refetch } = useTodoContext()

  return (
    <main>
      {error && <ErrorMessage message={error} onDissmis={refetch} />}
      <TodoForm />
      <div className="todo-container">
        <ul id="todo-list" className={isLoading ? 'isLoading' : ''}>
          {todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />
          })}
        </ul>
        {isLoading && todos.length === 0 && <Spinner />}
      </div>
    </main>
  )
}
