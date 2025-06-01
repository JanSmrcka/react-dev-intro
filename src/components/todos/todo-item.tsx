import { Link } from 'react-router'
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Button,
} from '@mui/material'
import {
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import type { Todo } from '../../types'
import { useTodoDelete } from '../../hooks/useTodoDelete'
import { useTodoToggle } from '../../hooks/useTodoToggle'

type TodoItemProps = {
  todo: Todo
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: deleteTodo, isPending: isDeleting } = useTodoDelete()
  const { mutate: toggleTodo, isPending: isToggling } = useTodoToggle()

  const handleDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  const handleToggleTodo = () => {
    toggleTodo({ id: todo.id, completed: !todo.completed })
  }

  return (
    <Card sx={{ mb: 2, opacity: todo.completed ? 0.7 : 1 }}>
      <CardContent sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handleToggleTodo}
            disabled={isToggling}
            color={todo.completed ? 'success' : 'default'}
          >
            {todo.completed ? (
              <CheckCircleIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </IconButton>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                fontWeight: 'medium',
                fontSize: '1rem',
              }}
            >
              {todo.name}
            </Typography>
            {todo.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {todo.description}
              </Typography>
            )}
            {todo.priority && (
              <Chip
                label={`Priority: ${todo.priority}`}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mt: 1 }}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={Link}
              to={`/todos/${todo.id}`}
              variant="outlined"
              size="small"
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>
            <IconButton
              onClick={handleDeleteTodo}
              disabled={isDeleting}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
