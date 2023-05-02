
interface Props extends React.ComponentProps<'h1'> {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Title = (props: Props) => {
  const {children, tag, className} = props
  const TagName = tag
  const styles = tag === 'h2' ? 'text-3xl font-semibold text-main' : ''
  return (
    <TagName className={`${styles} ${className}`}>{children}</TagName>
  )
}

export default Title