
interface Props extends React.ComponentProps<'div'> {}

const Alert = (props: Props) => {
  const {children} = props
  return (
    <div className='p-2 bg-main rounded-md text-white'>
      {children}
    </div>
  )
}

export default Alert