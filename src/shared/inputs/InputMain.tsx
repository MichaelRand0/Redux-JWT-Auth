import { Input } from '@material-tailwind/react'
import React from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types/form'

interface Props extends React.ComponentProps<'input'> {
  register: UseFormRegister<any>
  error?: string
  containerClassName?: string
}

const InputMain = (props: Props) => {
  const {error, className, containerClassName, register} = props
  return (
    <div className={containerClassName}>
      <Input className={`${className} ${error ? 'text-red-500' : ''}`} variant='standard' error={error ? true : false} color='indigo' {...register} />
      {error && <span className='text-red-500 text-xs pl-1 pt-1'>{error}</span>}
    </div>
  )
}

export default InputMain