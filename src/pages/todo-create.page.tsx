import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Slider,
  FormControl,
  InputLabel,
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { Header } from '../components/header'
import { useTodoCreate } from '../hooks/useTodoCreate'

const TodoCreatePage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(1)

  const { mutate: createTodo, isPending, error } = useTodoCreate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      return
    }    createTodo(
      {
        name: name.trim(),
        description: description.trim() || undefined,
        priority: priority,
      },
      {
        onSuccess: (newTodo) => {
          navigate(`/todos/${newTodo.id}`)
        },
      },
    )
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <>
      <Header title="Add New Todo" subtitle="Create a new task to track" />
      <Container maxWidth="md">
        <Box sx={{ mt: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mb: 3 }}
            variant="outlined"
          >
            Back to List
          </Button>

          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Create New Todo
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error.message}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Todo Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                variant="outlined"
                sx={{ mb: 3 }}
                disabled={isPending}
                placeholder="Enter a descriptive name for your todo"
              />

              <TextField
                fullWidth
                label="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                multiline
                rows={4}
                sx={{ mb: 3 }}
                disabled={isPending}
                placeholder="Add more details about this todo..."
              />

              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel shrink>Priority Level</InputLabel>
                <Box sx={{ px: 2, pt: 3 }}>
                  <Slider
                    value={priority}
                    onChange={(_, newValue) => setPriority(newValue as number)}
                    aria-labelledby="priority-slider"
                    valueLabelDisplay="on"
                    step={1}
                    marks
                    min={1}
                    max={5}
                    disabled={isPending}
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

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleBack}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!name.trim() || isPending}
                >
                  {isPending ? 'Creating...' : 'Create Todo'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default TodoCreatePage
