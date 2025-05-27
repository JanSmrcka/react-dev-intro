import { Header } from './components/header'
import { TodosSection } from './components/todos/todos-section'
import { TodosProvider } from './providers/todos.provider'
function App() {
  return (
    <>
      <TodosProvider>
        <div className="container">
          <Header title="My Todo List" subtitle="Add your tasks."></Header>
          <TodosSection />
        </div>
        <footer>
          <p>Click on a task to mark it as completed</p>
        </footer>
      </TodosProvider>
    </>
  )
}

export default App
