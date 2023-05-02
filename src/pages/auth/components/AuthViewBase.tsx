
interface Props extends React.ComponentProps<'div'> {}

const AuthViewBase = (props: Props) => {
  const {children} = props
  return (
    <div className='w-full h-screen bg-auth bg-cover flex items-center justify-center'>
      {children}
    </div>
  )
}

export default AuthViewBase