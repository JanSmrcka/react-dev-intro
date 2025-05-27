import { BrowserRouter, Route, Routes } from 'react-router'

import { TodosProvider } from './providers/todos.providers'
import { Layout } from './components/layout'
import TodoListPage from './pages/todo-list.page'
import TodoDetailPage from './pages/todo-detail'
function App() {
  return (
    <Layout>
      <TodosProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodoListPage />} />
            <Route path="*" element={<div>Not found</div>} />
            <Route path="/todos/:id" element={<TodoDetailPage />} />
          </Routes>
        </BrowserRouter>
      </TodosProvider>
    </Layout>
  )
}

export default App
