import { TodosProvider } from './components/providers/todos.provider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/todos/layout.tsx'
import { lazy, Suspense } from 'react'
import { Spinner } from './components/spinner.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const TodoListPage = lazy(() => import('./pages/todo-list.page.tsx'))
const TodoDetailPage = lazy(() => import('./pages/todo-detail.page.tsx'))

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <Layout>
        <TodosProvider>
          <BrowserRouter>
            <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Spinner/>}>
                  <TodoListPage />
                </Suspense>
              }
            />
              <Route
                path="/todo/:id"
                element={
                <Suspense fallback={<Spinner/>}>
                  <TodoDetailPage />
                </Suspense>
              }
              />
            </Routes>
          </BrowserRouter>
        </TodosProvider>
      </Layout>
      </QueryClientProvider>
    </>
  )
}
export default App
