import { TodoForm } from './todo-form'

export const TodosSection = () => {
  return (
    <main>
      <TodoForm />
      <div className="todo-container">
        <ul id="todo-list"></ul>
      </div>
    </main>
  )
}
