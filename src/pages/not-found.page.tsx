import { Box, Typography, Button } from '@mui/material'
import {
  Home as HomeIcon,
  ErrorOutline as ErrorIcon,
} from '@mui/icons-material'
import { Link } from 'react-router'

export const NotFoundPage = () => (
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
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ mb: 4, maxWidth: 400 }}
    >
      Sorry, we couldn't find the page you're looking for. The page might have
      been moved, deleted, or you might have entered the wrong URL.
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
