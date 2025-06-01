import { Box, Typography } from '@mui/material'

type HeaderProps = {
  title: string
  subtitle: string
}
export const Header = (props: HeaderProps) => {
  return (
    <Box
      component="header"
      sx={{
        textAlign: 'center',
        py: 4,
        mb: 3,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 'bold',
          color: 'text.primary',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        {props.title}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{
          mt: 1,
          color: 'text.secondary',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        {props.subtitle}
      </Typography>
    </Box>
  )
}
