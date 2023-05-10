import Modal from '@/shared/modals/Modal'
import AuthViewBase from './components/AuthViewBase'
import Title from '@/shared/typography/Title'
import { i18n } from '@/locales'
import Link from '@/shared/typography/Link'
import ButtonMain from '@/shared/buttons/ButtonMain'
import InputMain from '@/shared/inputs/InputMain'
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from './hooks'
import { useEffect } from 'react'
import Dialog from '@/shared/dialogs/Dialog'
import { useDialog } from '@/shared/dialogs/hooks'
import { useRouter } from 'next/router'

interface Props extends React.ComponentProps<'div'> {}

const Login = (props: Props) => {
  const schema = object({
    login: string().required('Обязательное поле'),
    password: string().required('Обязательное поле'),
  })
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const { login, status } = useAuth()
  const { open, toggleOpen } = useDialog()
  const { push } = useRouter()
  const onSubmit = () => {
    const user = {
      login: getValues().login,
      password: getValues().password,
    }
    login(user)
    console.log('STATUS', status)
  }
  const onError = () => {
    console.log('errors', errors)
  }
  // useEffect(() => {
  //   console.log('status', status)
  //   if (status?.type === 'success' || status?.type === 'error') {
  //     toggleOpen(true)
  //   }
  // }, [status?.type, status?.message])
  return (
    <AuthViewBase>
      <Modal>
        <Title tag="h2" className="mb-5">
          {i18n._auth.auth}
        </Title>
        <div className="max-w-[200px] w-full flex flex-col items-center">
          <InputMain
            error={errors?.['login']?.message?.toString()}
            register={{ ...register('login'), label: i18n._auth.login }}
            containerClassName="mb-3"
          />
          <InputMain
            error={errors?.['password']?.message?.toString()}
            register={{ ...register('password'), label: i18n._auth.password }}
            containerClassName="mb-3"
          />
          <Link className="ml-auto" href="/auth/signup">
            {i18n._auth.createAccount}
          </Link>
          {/* <span className="text-red-500 mt-5 block text-xs">{!status?.isSuccess && status?.message}</span> */}
          <ButtonMain onClick={handleSubmit(onSubmit, onError)} className="mt-10">
            {i18n._auth.signIn}
          </ButtonMain>
        </div>
      </Modal>
      <Dialog
        variant={status?.type === 'success' ? 'success' : 'error'}
        open={open}
        handleOpen={() => {
          toggleOpen(false)
          if(status?.type === 'success') {
            push('/')
          }
        }}
      >
        {status?.message}
      </Dialog>
    </AuthViewBase>
  )
}

export default Login
