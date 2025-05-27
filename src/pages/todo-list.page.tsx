import { Header } from '../components/header'
import { TodosSection } from '../components/todos/todos-section'

const TodoListPage = () => {
  return (
    <>
      <Header title="my todo app" subtitle="add your tasks" />
      <TodosSection />
      <footer>
        <p>Click on a task to mark it as completed</p>
      </footer>
    </>
  )
}

export default TodoListPage
