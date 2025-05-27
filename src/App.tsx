import InputForm from './components/InputForm';
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
          <InputForm />
          <div className="todo-container">
           <TodoList />
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
