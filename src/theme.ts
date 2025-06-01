import { createTheme } from '@mui/material/styles'

const commonThemeOptions = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
}

export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#33adff',
      light: '#8ea0e8',
      dark: '#5b6eae',
    },
    secondary: {
      main: '#33cc33',
      light: '#69c69a',
      dark: '#369766',
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(44, 45, 49, 0.95)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
    error: {
      main: '#ed4245',
    },
    success: {
      main: '#33cc33',
    },
  },
  components: {
    ...commonThemeOptions.components,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364);',
          backgroundAttachment: 'fixed',
        },
      },
    },
  },
})

export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#2e7d32',
      light: '#66bb6a',
      dark: '#1b5e20',
    },
    background: {
      default: '#f5f5f5',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#2e7d32',
    },
  },
  components: {
    ...commonThemeOptions.components,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          background: 'linear-gradient(to right, #9796f0, #fbc7d4);',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        outlined: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.2)',
        },
        filled: {
          '&.MuiChip-colorWarning': {
            backgroundColor: '#ff9800',
            color: '#ffffff',
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: '#2e7d32',
            color: '#ffffff',
          },
          '&.MuiChip-colorPrimary': {
            backgroundColor: '#1976d2',
            color: '#ffffff',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(0, 0, 0, 0.8)',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          color: 'rgba(0, 0, 0, 0.87)',
          '&.Mui-selected': {
            backgroundColor: 'rgba(25, 118, 210, 0.9)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.8)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          borderRadius: 8,
        },
        outlined: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          color: 'rgba(0, 0, 0, 0.87)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
        },
      },
    },
  },
})

export const theme = darkTheme
