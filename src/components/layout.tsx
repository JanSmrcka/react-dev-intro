import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const Layout = ({ children }: Props) => {
  return <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 w-screen h-screen">
    {children}
  </div>
}
