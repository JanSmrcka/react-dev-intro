import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error'
import { useTodosQuery } from '../hooks/useTodosQuery'

export const TodosSection = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery()

  return (
    <main>
      {error && <ErrorMessage message={error.message} onDismiss={refetch} />}
      <TodoForm />
      <div className="todo-container">
        <ul id="todo-list" className={isLoading ? 'isLoading' : ''}>
          {todos?.map((todo) => {
            return <TodoItem key={todo.id} todo={todo}></TodoItem>
          })}
        </ul>
        {isLoading && <Spinner />}
      </div>
    </main>
  )
}
