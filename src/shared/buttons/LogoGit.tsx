import GitHubIcon from '../../../public/icons/GitHubIcon'

interface Props extends React.ComponentProps<'a'> {
  width?: string
  height?: string
  color?: string
}

const LogoGit = (props: Props) => {
  const { href = '#', width, height, color } = props
  return (
    <a href={href} className='opacity-20 hover:opacity-100 transition-opacity' target='_blank'>
      <GitHubIcon width={width} height={height} color={color} />
    </a>
  )
}

export default LogoGit
