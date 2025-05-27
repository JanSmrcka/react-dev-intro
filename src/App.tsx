import { BrowserRouter, Route, Routes } from 'react-router'
import { TodosProvider } from './providers/todos.provider'
import { Layout } from './components/layout'
import TodoListPage from './pages/todo-list.page'
import { lazy, Suspense } from 'react'
import { Spinner } from './components/spinner'

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
                <Suspense fallback={<Spinner />}>
                  <TodoListPage />
                </Suspense>
              }
            />
            <Route
              path="/todos/:id"
              element={
                <Suspense fallback={<Spinner />}>
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
