import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  InputAdornment,
} from '@mui/material'
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material'
import { Link } from 'react-router'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { useTodosQuery } from '../../hooks/useTodosQuery'

type FilterStatus = 'all' | 'active' | 'completed'

export const TodosSection = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery()
  const [filter, setFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all')

  const filteredTodos =
    todos?.filter((todo) => {
      const matchesText =
        todo.name.toLowerCase().includes(filter.toLowerCase()) ||
        (todo.description &&
          todo.description.toLowerCase().includes(filter.toLowerCase()))

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && todo.completed) ||
        (statusFilter === 'active' && !todo.completed)

      return matchesText && matchesStatus
    }) || []

  const activeTodosCount = todos?.filter((todo) => !todo.completed).length || 0
  const completedTodosCount =
    todos?.filter((todo) => todo.completed).length || 0
  const totalTodosCount = todos?.length || 0
  return (
    <Box component="main" sx={{ mt: 3 }}>
      {error && (
        <Alert severity="error" onClose={() => refetch()} sx={{ mb: 3 }}>
          {error.message}
        </Alert>
      )}

      {/* Stats Section */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Chip
          label={`Total: ${totalTodosCount}`}
          color="primary"
          variant="outlined"
        />
        <Chip
          label={`Active: ${activeTodosCount}`}
          color="warning"
          variant="outlined"
        />
        <Chip
          label={`Completed: ${completedTodosCount}`}
          color="success"
          variant="outlined"
        />
        <Button
          component={Link}
          to="/todos/new"
          variant="contained"
          color="primary"
          sx={{ ml: 'auto' }}
          startIcon={<AddIcon />}
        >
          Add New Todo
        </Button>
      </Box>

      {/* Filter Controls */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          placeholder="Search todos by name or description..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ flex: 1, minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={(_, newFilter) => newFilter && setStatusFilter(newFilter)}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ mt: 3 }}>
        {isLoading && <Spinner />}

        {!isLoading && filteredTodos.length === 0 && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', py: 4 }}
          >
            {filter || statusFilter !== 'all'
              ? `No todos found matching your filters.`
              : 'No todos yet. Create your first one!'}
          </Typography>
        )}

        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Box>
    </Box>
  )
}
