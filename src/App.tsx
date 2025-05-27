import { TodosProvider } from './components/providers/todos.provider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/todos/layout.tsx'
import TodoListPage from './pages/todo-list.page.tsx'
import TodoDetailPage from './pages/todo-detail.page.tsx'


function App() {
  return (
    <>
      <Layout>
        <TodosProvider>
          <BrowserRouter>
            <Routes>
            <Route
              path="/"
              element={<TodoListPage />}
            />
              <Route
                path="/todo/:id"
                element={<TodoDetailPage />}
              />
            </Routes>
          </BrowserRouter>
        </TodosProvider>
      </Layout>
    </>
  )
}
export default App
