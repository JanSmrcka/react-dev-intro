import { lazy, Suspense } from 'react'
import { Layout } from './components/layout'
import TodoListPage from './pages/todos-list.page'
import { TodosProvider } from './providers/todos.provider'
import { BrowserRouter, Route, Routes } from 'react-router'

const TodoDetailPage = lazy(() => import('./pages/todo-detail.page'))
function App() {
  return (
    <Layout>
      <TodosProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>is loading</div>}>
                  <TodoListPage />
                </Suspense>
              }
            />
            <Route
              path="/todos/:id"
              element={
                <Suspense fallback={<div>Is loading javascript</div>}>
                  <TodoDetailPage />
                </Suspense>
              }
            />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </BrowserRouter>
      </TodosProvider>
    </Layout>
  )
}

export default App
