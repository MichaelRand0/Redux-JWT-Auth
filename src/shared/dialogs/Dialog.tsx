import {
  Button,
  Dialog as DialogComponent,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import { handler } from '@material-tailwind/react/types/components/dialog'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'

interface Props extends React.ComponentProps<'div'> {
  open: boolean
  handleOpen: handler
  variant?: 'default' | 'success' | 'error'
}

const Dialog = (props: Props) => {
  const { open, handleOpen, variant = 'default', children } = props
  return (
    <DialogComponent
      className={`${variant === 'error' && 'border-red-500 border-2'} ${
        variant === 'success' && 'border-green-500 border-2'
      }`}
      open={open}
      handler={handleOpen}
    >
      <DialogHeader className="flex justify-center">
        {variant === 'error' && <ExclamationTriangleIcon width="80" height="80" color="red" />}
        {variant === 'success' && <CheckCircleIcon width="80" height="80" color="green" />}
      </DialogHeader>
      <DialogBody className="flex justify-center text-black" divider>
        {children ?? 'Произошла ошибка'}
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button
          className="w-32"
          variant="gradient"
          color={`${variant === 'success' ? 'green' : 'purple'}`}
          onClick={handleOpen}
        >
          <span>OK</span>
        </Button>
      </DialogFooter>
    </DialogComponent>
  )
}

export default Dialog
