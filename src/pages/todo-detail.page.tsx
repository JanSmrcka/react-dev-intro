import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Alert,
  Card,
  CardContent,
  IconButton,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material'
import { Header } from '../components/header'
import { useTodoQuery } from '../hooks/useTodoQuery'
import { useTodoToggle } from '../hooks/useTodoToggle'
import { useTodoDelete } from '../hooks/useTodoDelete'
import { useTodoUpdate } from '../hooks/useTodoUpdate'

// Helper function to format dates in a user-friendly way
const formatDate = (dateString?: string) => {
  if (!dateString) return 'Unknown'

  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInMinutes < 1) {
    return 'Just now'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
}

const TodoDetailPage = () => {
  const navigate = useNavigate()
  const { data: todo, isError, error } = useTodoQuery()
  const { mutate: toggleTodo, isPending: isToggling } = useTodoToggle()
  const { mutate: deleteTodo, isPending: isDeleting } = useTodoDelete()
  const { mutate: updateTodo, isPending: isUpdating } = useTodoUpdate()

  const [isEditMode, setIsEditMode] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedDescription, setEditedDescription] = useState('')
  const [editedPriority, setEditedPriority] = useState(1)

  const handleStartEdit = () => {
    if (todo) {
      setEditedName(todo.name)
      setEditedDescription(todo.description || '')
      setEditedPriority(todo.priority || 1)
      setIsEditMode(true)
    }
  }

  const handleCancelEdit = () => {
    setIsEditMode(false)
    setEditedName('')
    setEditedDescription('')
    setEditedPriority(1)
  }

  const handleSaveEdit = () => {
    if (todo && editedName.trim()) {
      updateTodo(
        {
          id: todo.id,
          todo: {
            name: editedName.trim(),
            description: editedDescription.trim() || undefined,
            priority: editedPriority,
          },
        },
        {
          onSuccess: () => {
            setIsEditMode(false)
          },
        },
      )
    }
  }

  const handleToggleComplete = () => {
    if (todo) {
      toggleTodo({ id: todo.id, completed: !todo.completed })
    }
  }

  const handleDelete = () => {
    if (todo && window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(todo.id, {
        onSuccess: () => {
          navigate('/')
        },
      })
    }
  }

  if (isError || !todo) {
    return (
      <>
        <Header title="Todo Detail" subtitle="Todo not found" />
        <Container maxWidth="md" sx={{ mt: 3 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error?.message || 'Could not load todo item.'}
          </Alert>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
          >
            Back to Home
          </Button>
        </Container>
      </>
    )
  }

  return (
    <>
      <Header title="Todo Detail" subtitle="View and manage your todo" />
      <Container maxWidth="md">
        <Box sx={{ mt: 3 }}>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
            variant="outlined"
          >
            Back to Home
          </Button>

          <Card
            elevation={2}
            sx={{
              backgroundColor: 'background.paper',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {isEditMode ? (
                // EDIT MODE
                <>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Edit Todo
                  </Typography>

                  <Box component="form" sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Todo Name"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      required
                      variant="outlined"
                      sx={{ mb: 3 }}
                      disabled={isUpdating}
                    />

                    <TextField
                      fullWidth
                      label="Description (optional)"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      variant="outlined"
                      multiline
                      rows={4}
                      sx={{ mb: 3 }}
                      disabled={isUpdating}
                    />

                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel shrink>Priority Level</InputLabel>
                      <Box sx={{ px: 2, pt: 3 }}>
                        <Slider
                          value={editedPriority}
                          onChange={(_, newValue) =>
                            setEditedPriority(newValue as number)
                          }
                          aria-labelledby="priority-slider"
                          valueLabelDisplay="on"
                          step={1}
                          marks
                          min={1}
                          max={5}
                          disabled={isUpdating}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 1,
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            Low
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            High
                          </Typography>
                        </Box>
                      </Box>
                    </FormControl>
                  </Box>

                  <Box
                    sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}
                  >
                    <Button
                      onClick={handleCancelEdit}
                      disabled={isUpdating}
                      variant="outlined"
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveEdit}
                      disabled={!editedName.trim() || isUpdating}
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                    >
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </Box>
                </>
              ) : (
                // VIEW MODE
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <IconButton
                      onClick={handleToggleComplete}
                      disabled={isToggling}
                      color={todo.completed ? 'success' : 'default'}
                      size="large"
                    >
                      {todo.completed ? (
                        <CheckCircleIcon fontSize="large" />
                      ) : (
                        <RadioButtonUncheckedIcon fontSize="large" />
                      )}
                    </IconButton>

                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          textDecoration: todo.completed
                            ? 'line-through'
                            : 'none',
                          color: todo.completed
                            ? 'text.secondary'
                            : 'text.primary',
                          fontWeight: 'bold',
                          mb: 1,
                          wordWrap: 'break-word',
                        }}
                      >
                        {todo.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Chip
                          label={todo.completed ? 'Completed' : 'Active'}
                          color={todo.completed ? 'success' : 'warning'}
                          variant="filled"
                        />
                        {todo.priority && (
                          <Chip
                            label={`Priority: ${todo.priority}`}
                            color="primary"
                            variant="filled"
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>

                  {todo.description && (
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 3,
                        mb: 3,
                        backgroundColor: 'grey.100',
                        color: 'grey.900',
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Description
                      </Typography>
                      <Divider sx={{ mb: 2, borderColor: 'grey.500' }} />
                      <Typography
                        variant="body1"
                        sx={{ whiteSpace: 'pre-wrap' }}
                      >
                        {todo.description}
                      </Typography>
                    </Paper>
                  )}

                  {/* Timestamp Information */}
                  <Box
                    sx={{
                      p: 3,
                      mb: 3,
                    }}
                  >
                    <Divider sx={{ mb: 2 }} />
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        <strong>Created:</strong> {formatDate(todo.createdAt)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Last updated:</strong>{' '}
                        {formatDate(todo.updatedAt)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}
                  >
                    <Button
                      onClick={handleToggleComplete}
                      disabled={isToggling}
                      variant="contained"
                      color={todo.completed ? 'warning' : 'success'}
                      startIcon={
                        todo.completed ? (
                          <RadioButtonUncheckedIcon />
                        ) : (
                          <CheckCircleIcon />
                        )
                      }
                    >
                      {isToggling
                        ? 'Updating...'
                        : todo.completed
                        ? 'Mark as Active'
                        : 'Mark as Completed'}
                    </Button>
                    <Button
                      onClick={handleStartEdit}
                      disabled={isToggling || isDeleting}
                      color="primary"
                      variant="contained"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  )
}

export default TodoDetailPage
