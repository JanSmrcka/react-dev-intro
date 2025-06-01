import { IconButton, Tooltip } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useTheme } from '../context/theme.context'

export const ThemeToggle = () => {
  const { mode, toggleMode } = useTheme()

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleMode}
        color="inherit"
        size="large"
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
          backgroundColor: 'background.paper',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}
