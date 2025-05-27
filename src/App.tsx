
import { Header } from "./components/header"
import { TodosSection } from "./components/todos/todos-section"
import { TodosProvider } from './components/providers/todos.provider.tsx'
function App() {
  return (
    <>
      <TodosProvider>
      <div className="container">
        <Header title="my todo app" subtitle="add your tasks"/>
        <TodosSection/>
        <footer>
          <p>Click on a task to mark it as completed</p>
        </footer>
      </div>
      </TodosProvider>
    </>
  )
}
export default App
