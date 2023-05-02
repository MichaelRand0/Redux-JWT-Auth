import {useSelector, useDispatch} from 'react-redux'
import { decrement, increment, selectValue } from '@/features/counter/counterSlice'
import { Button } from "@material-tailwind/react"

export default function Home() {
  const count = useSelector(selectValue)
  const dispatch = useDispatch()
  return (
    <div className='p-5'>
      <h1 className='mb-5'>Counter is: {count}</h1>
      <Button className='mr-5' onClick={() => dispatch(decrement())}>Decrement</Button>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
    </div>
  )
}