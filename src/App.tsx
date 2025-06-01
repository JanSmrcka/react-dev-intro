import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/layout'
import { lazy, Suspense } from 'react'
import { Spinner } from './components/spinner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CustomThemeProvider } from './context/theme.context'
import { ThemeToggle } from './components/theme-toggle'
import { NotFoundPage } from './pages/not-found.page'

const TodoDetailPage = lazy(() => import('./pages/todo-detail.page'))
const TodoListPage = lazy(() => import('./pages/todo-list.page'))
const TodoCreatePage = lazy(() => import('./pages/todo-create.page'))

const queryClient = new QueryClient()

function App() {
  return (
    <CustomThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeToggle />
        <Layout>
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
                path="/todos/new"
                element={
                  <Suspense fallback={<Spinner />}>
                    <TodoCreatePage />
                  </Suspense>
                }
              />{' '}
              <Route
                path="/todos/:id"
                element={
                  <Suspense fallback={<Spinner />}>
                    <TodoDetailPage />
                  </Suspense>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </QueryClientProvider>
    </CustomThemeProvider>
  )
}

export default App
