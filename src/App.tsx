import { BrowserRouter, Route, Routes } from 'react-router'

import { TodosProvider } from './providers/todos.providers'
import { Layout } from './components/layout'
import TodoListPage from './pages/todo-list.page'
import TodoDetailPage from './pages/todo-detail'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
