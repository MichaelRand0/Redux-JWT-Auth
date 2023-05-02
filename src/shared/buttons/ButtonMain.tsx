
interface Props extends React.ComponentProps<'button'> {
  variant?: 'default' | 'light'
}

const ButtonMain = (props: Props) => {
  const {className, children, variant = 'default'} = props
  const colorTheme = variant === 'default' ? 'bg-main text-white hover:bg-white hover:text-main hover:border-main' : 'bg-white text-main border-main hover:bg-gradient-main hover:text-white hover:border-transparent'
  return (
    <button className={`p-2 w-full border transition-all ease-in-out duration-100 text-center flex items-center justify-center rounded-sm ${colorTheme} ${className}`}>{children}</button>
  )
}

export default ButtonMain