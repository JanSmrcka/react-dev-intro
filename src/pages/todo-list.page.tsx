import { Header } from '../components/header'
import { TodosSection } from '../components/todos/todos-section'
import { useTheme } from '../context/theme.context'

const TodoListPage = () => {
  const { mode } = useTheme()

  return (
    <>
      <Header title="My Todo List" subtitle="Add your tasks" />
      <TodosSection />{' '}
      <footer
        style={{
          color: mode === 'light' ? 'black' : 'var(--text-secondary)',
          display: 'flex', flexDirection: 'column',
					alignItems: 'center',
        }}
      >
        <p>Create • Edit • Complete • Organize your daily tasks efficiently</p>
				<p>Dávid Vikor • vikd00@vse.cz • 2025</p>
      </footer>
    </>
  )
}

export default TodoListPage
