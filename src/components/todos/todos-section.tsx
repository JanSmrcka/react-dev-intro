import { TodoItem } from './todo-item'
import { TodoForm } from './todos-form'
import { Spinner } from '../spinner'
import { useTodos } from '../../hooks/useTodos'
import { ErrorMessage} from '../error'


export const TodosSection = () => {
    const {addTodo,isLoading, todos, deleteTodo, toggleTodo, error, refetch} = useTodos()

  return (
    <main>
        {error && <ErrorMessage message={error} onDismiss={refetch}/>}
        
      <TodoForm addTodo={addTodo}/>
      <div className="todo-container">
        <ul id="todo-list" className={isLoading ? "isLoading" : ""}>
            {todos.map((todo) => {
                return <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
            })}
        </ul>
        {isLoading && todos.length === 0 && <Spinner/>}
      </div>
    </main>
  )
}
