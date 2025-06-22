import { Layout } from './components/layout'
import { lazy, Suspense } from 'react'
import { Spinner } from './components/spinner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TodoDetailDrawer } from './components/todos/todo-detail-drawer'
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams } from 'react-router'

const TodoListPage = lazy(() => import('./pages/todo-list.page'))

const queryClient = new QueryClient()

const DrawerWrapper = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  return (
    <TodoDetailDrawer id={Number(id)} isOpen onClose={() => navigate(-1)} />
  )
}

const AppRoutes = () => {
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>is loading</div>}>
              <TodoListPage />
            </Suspense>
          }
        />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/todos/:id" element={<DrawerWrapper />} />
        </Routes>
      )}
    </>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
