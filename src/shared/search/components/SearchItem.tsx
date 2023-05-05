
interface Props extends React.ComponentProps<'div'> {
  item: {
    name: string
    link: string
  }
}

const SearchItem = (props: Props) => {
  const {item, className} = props
  return (
    <div className={`w-full ${className}`}>
      <a className='border-b border-b-black w-full inline-block hover:border-b-transparent' href={item.link}>{item.name}</a> 
    </div>
  )
}

export default SearchItem