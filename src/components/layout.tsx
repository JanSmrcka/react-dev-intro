import { Container, Box } from '@mui/material'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const Layout = ({ children }: Props) => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>{children}</Box>
    </Container>
  )
}
