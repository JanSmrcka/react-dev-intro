import { Link } from 'react-router'
import { Header } from '../components/header'
import { TodosSection } from '../components/todos/todos-section'

const TodoListPage = () => {
  return (
    <>
      <Header title="My Todo List" subtitle="Add your tasks" />

      <div className="centered-container">
        <Link to="/todos/new">
          <button type="button" className="text-button">
            Create new TODO on seperate page →
          </button>
        </Link>
      </div>

      <TodosSection />

      <footer>
        <p>braj15 semestralní práce</p>
      </footer>
    </>
  )
}

export default TodoListPage
