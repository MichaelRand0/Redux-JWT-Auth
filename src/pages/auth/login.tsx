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
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import { usePopup } from '@/hooks/popup'

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const { signIn } = useAuth()
  
  const { push } = useRouter()
  const { setPopup } = usePopup()
  const onSubmit = async () => {
    const user = {
      login: getValues().login,
      password: getValues().password,
    }
    await signIn(user).then((resp: any) => {
      if (resp?.error) {
        setPopup({
          type: 'error',
          message:
            resp?.error?.data?.message === 'Incorrect login or password'
              ? 'Неправильный логин или пароль.'
              : 'Произошла ошибка, попробуйте позже.',
        })
      } else {
        push('/')
      }
    })
  }
  const onError = () => {
    console.log('errors', errors)
  }
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
          <ButtonMain onClick={handleSubmit(onSubmit, onError)} className="mt-10">
            {i18n._auth.signIn}
          </ButtonMain>
        </div>
      </Modal>
    </AuthViewBase>
  )
}

export default Login
