type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return <div className="container">{children}</div>
}
