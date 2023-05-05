import { useForm } from "react-hook-form"
import InputMain from "../inputs/InputMain"
import SearchItem from "./components/SearchItem"
import { yupResolver } from "@hookform/resolvers/yup"
import { object, string } from "yup"
import { useEffect } from "react"

type SearchItemType = {
  name: string
  link: string
}

interface Props extends React.ComponentProps<'input'> {
  data: SearchItemType[] | undefined
  registerData: any
}

const Search = (props: Props) => {
  const {data = [], registerData} = props
  return (
    <div className='w-full max-w-sm relative'>
      <InputMain register={registerData} />
      {data.length > 0 && 
      <div className='w-full mt-2 absolute p-3 bg-white shadow-md z-50'>
        {data?.map(item => {
          return (
            <SearchItem className='mb-2 last:mb-0' key={item.name} item={item} />
          )
        })}
      </div>}
    </div>
  )
}

export default Search