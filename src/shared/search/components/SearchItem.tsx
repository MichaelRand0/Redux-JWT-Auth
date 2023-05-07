import ButtonMain from "@/shared/buttons/ButtonMain"

interface Props extends React.ComponentProps<'div'> {
  item: {
    name: string
    link: string
  },
  handler?: Function
}

const SearchItem = (props: Props) => {
  const {item, className, handler} = props
  return (
    <div className={`w-full ${className}`}>
      {handler ? 
      <button className='border-b border-b-black w-full text-start hover:border-b-transparent' onClick={() => handler(item.name)}>{item.name}</button> : 
      <a className='border-b border-b-black w-full inline-block hover:border-b-transparent' target='_blank' href={item.link}>{item.name}</a>}
    </div>
  )
}

export default SearchItem