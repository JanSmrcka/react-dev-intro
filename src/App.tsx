import InputForm from './components/InputForm.tsx'
import TodoList from './components/TodoList.tsx'

function App() {
  return (
    <>
      <div className="container">
        <header>
          <h1>My Todo List</h1>
          <p className="subtitle">Add your tasks</p>
        </header>
        <main>
          <InputForm></InputForm>
          <div className="todo-container">
            <TodoList></TodoList>
          </div>
        </main>
        <footer>
          <p>Click on a task to mark it as completed</p>
        </footer>
      </div>
    </>
  )
}

export default App
