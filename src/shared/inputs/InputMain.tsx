import { Input } from '@material-tailwind/react'
import React from 'react'

interface Props extends React.ComponentProps<'input'> {
  containerClassName?: string
  label: string
  error?: string
}

const InputMain = (props: Props) => {
  const {error, className, containerClassName, label, value, name} = props
  return (
    <div className={containerClassName}>
      <Input name={name} value={value} className={`${className} ${error ? 'text-red-500' : ''}`} label={label} variant='standard' error={error ? true : false} color='indigo' />
      {error && <span className='text-red-500 text-xs pl-1 pt-1'>{error}</span>}
    </div>
  )
}

export default InputMain