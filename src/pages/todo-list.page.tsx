import { Header } from '../components/header'
import { TodosSection } from '../components/todos/todos-section'

const TodoListPage = () => {
  return (
    <>
      <Header title="My Todo list" subtitle="Add your tasks" />
      <TodosSection />
      <footer>
        <p>Author: hana15</p>
      </footer>
    </>
  )
}

export default TodoListPage
