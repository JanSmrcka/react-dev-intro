import { TodoForm } from "./todo-form"
import { TodoItem } from './todo-item.tsx'
import { Spinner } from '../spinner.tsx'
import { TodoError } from './todo-error.tsx'
import { useTodosContext } from '../../hooks/useTodosContext.ts'

export const TodosSection = () => {
 const {todos, error, isLoading, refetch} = useTodosContext()

  return (
    <main>
      {error != null && (<TodoError message={error} onDismiss={refetch} />)}
      <TodoForm />
      <div className="todo-container">
        <ul id="todo-list">
          {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          )
        })}
        </ul>
        {isLoading && todos.length === 0 && <Spinner />}
      </div>
    </main>
  )
}
