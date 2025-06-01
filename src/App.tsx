import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/layout'
import { lazy, Suspense } from 'react'
import { Spinner } from './components/spinner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CustomThemeProvider } from './context/theme.context'
import { ThemeToggle } from './components/theme-toggle'
import { Box, Typography, Button } from '@mui/material'
import { Home as HomeIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material'
import { Link } from 'react-router'

const TodoDetailPage = lazy(() => import('./pages/todo-detail.page'))
const TodoListPage = lazy(() => import('./pages/todo-list.page'))
const TodoCreatePage = lazy(() => import('./pages/todo-create.page'))

const queryClient = new QueryClient()

const NotFoundPage = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      py: 8,
      px: 3,
    }}
  >
    <ErrorIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
      Page Not Found
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400 }}>
      Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you might have entered the wrong URL.
    </Typography>
    <Button
      component={Link}
      to="/"
      variant="contained"
      startIcon={<HomeIcon />}
      size="large"
    >
      Back to Home
    </Button>
  </Box>
)

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
              />              <Route
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
