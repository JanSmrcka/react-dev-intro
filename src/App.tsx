import { BrowserRouter, Route, Routes } from 'react-router'
import { TodosProvider } from './providers/todos.provider'
import { Layout } from './components/layout'
import TodoListPage from './pages/todo-list.page'
import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const TodoDetailPage = lazy(() => import('./pages/todo-detail.page'))

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <TodosProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TodoListPage />}></Route>
              <Route
                path="/todos/:id"
                element={
                  <Suspense fallback={<div>isLoadingJavascript</div>}>
                    <TodoDetailPage></TodoDetailPage>
                  </Suspense>
                }
              ></Route>
              <Route path="*" element={<div>Not found</div>}></Route>
            </Routes>
          </BrowserRouter>
        </TodosProvider>
      </Layout>
    </QueryClientProvider>
  )
}

export default App
