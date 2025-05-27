import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'

export const TodosSection = () => {
  return (
    <main>
      <TodoForm />
      <div className="todo-container">
        <ul id="todo-list">
          <TodoItem todo={{ id: 1, name: 'Sample todo', completed: false }} />
        </ul>
      </div>
    </main>
  )
}
