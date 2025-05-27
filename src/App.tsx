import { lazy, Suspense } from 'react'
import { Layout } from './components/layout'
import { TodosProvider } from './providers/todos.provider'
import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const TodoDetailPage = lazy(() => import('./pages/todo-detail.page'))
const TodoListPage = lazy(() => import('./pages/todos-list.page'))

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
