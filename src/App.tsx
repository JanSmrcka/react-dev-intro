import { Header } from "./components/header"

function App() {
  return (
    <>
      <div className="container">
        <Header title="My Todo List" subtitle="Add your tasks" />
        <main>
          <form id="todo-form">
            <div className="input-group">
              <input name="todo-text" id="new-todo-input" placeholder="What needs to be done?" />
              <button type="submit" id="add-btn">
                Add
              </button>
            </div>
          </form>
          <div className="todo-container">
            <ul id="todo-list"></ul>
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
