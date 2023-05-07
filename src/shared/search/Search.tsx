import { useEffect, useState } from "react"
import InputMain from "../inputs/InputMain"
import SearchItem from "./components/SearchItem"

type SearchItemType = {
  name: string
  link: string
}

interface Props extends React.ComponentProps<'input'> {
  data: SearchItemType[] | undefined
  registerData: any
  searchItemHandler?: Function
}

const Search = (props: Props) => {
  const {data = [], registerData, searchItemHandler} = props
  const handler = (text:string) => {
    searchItemHandler && searchItemHandler(text)
  }
  return (
    <div className='w-full max-w-sm relative'>
      <InputMain register={registerData} />
      {data.length > 0 ? 
      <div className='w-full mt-2 absolute p-3 bg-white shadow-md z-50'>
        {data?.map(item => {
          return (
            <SearchItem handler={handler} className='mb-2 last:mb-0' key={item.name} item={item} />
          )
        })}
      </div> : ''}
    </div>
  )
}

export default Search