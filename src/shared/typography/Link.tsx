import Route, { LinkProps } from 'next/link'

interface Props extends LinkProps {
  children: React.ReactNode
  className?: string
}

const Link = (props: Props) => {
  const { className, children, href } = props
  return (
    <Route
      {...props}
      href={href}
      className={`text-sm text-main border-b border-b-main hover:border-transparent transition-all duration-75 ${className}`}
    >
      {children}
    </Route>
  )
}

export default Link
