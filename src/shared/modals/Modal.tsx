
interface Props extends React.ComponentProps<'div'> {
  isDark?: boolean
}

const Modal = (props: Props) => {
  const {children, isDark = false, className} = props
  return (
    <div className={`absolute w-full h-screen z-50 flex items-center justify-center ${isDark ? 'bg-black/75' : ''}`}>
      <div className={`w-fit bg-white py-6 px-8 flex flex-col items-center rounded-sm ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default Modal