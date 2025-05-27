import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { useTodos } from '../../hooks/useTodos'
import { ErrorMessage } from '../error-message'

export const TodosSection = () => {
  const { todos, isLoading, error, addTodo, deleteTodo, toggleTodo, refetch } = useTodos()

  return (
    <main>
      {error && <ErrorMessage message={error} onDismiss={refetch} />}
      <TodoForm addTodo={addTodo} />
      <div className="todo-container">
        <ul id="todo-list" className={isLoading ? 'isLoading' : ''}>
          {todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
          })}
        </ul>
        {isLoading && todos.length === 0 && <Spinner />}
      </div>
    </main>
  )
}
