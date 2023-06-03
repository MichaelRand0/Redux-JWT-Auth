import Modal from '@/shared/modals/Modal'
import AuthViewBase from './components/AuthViewBase'
import Title from '@/shared/typography/Title'
import { i18n } from '@/locales'
import InputMain from '@/shared/inputs/InputMain'
import Link from '@/shared/typography/Link'
import ButtonMain from '@/shared/buttons/ButtonMain'
import { object, ref, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@/shared/modals/Alert'
import { useAuth } from '@/hooks/auth'
import { usePopup } from '@/hooks/popup'

interface Props extends React.ComponentProps<'div'> {}

const SignUp = (props: Props) => {
  const schema = object({
    login: string().required('Обязательное поле'),
    password: string()
      .required('Обязательное поле')
      .min(6, 'Минимум 6 символов')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, 'Невалидный пароль'),
    repeatPassword: string()
      .oneOf([ref('password'), undefined], 'Пароли не совпадают')
      .required('Обязательное поле'),
  })
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const { createUser } = useAuth()
  const { setPopup } = usePopup()
  const onSubmit = async () => {
    const user = {
      login: getValues().login,
      password: getValues().password,
    }
    await createUser(user).then((resp: any) => {
      if (!resp?.error) {
        setPopup({
          type: 'success',
          message: 'Аккаунт успешно создан!',
          toRoute: '/auth/login',
        })
      } else {
        setPopup({
          type: 'error',
          message: resp?.error?.data?.message === 'User already exists' ? 'Пользователь с таким логином уже существует.' : 'Произошла ошибка, попробуйте позже.',
        })
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
          {i18n._auth.registration}
        </Title>
        <div className="max-w-[200px] w-full flex flex-col items-center">
          <InputMain
            register={{ ...register('login'), label: i18n._auth.login }}
            error={errors?.['login']?.message?.toString()}
            containerClassName="mb-3"
          />
          <InputMain
            register={{ ...register('password'), label: i18n._auth.password }}
            error={errors?.['password']?.message?.toString()}
            containerClassName="mb-3"
          />
          <InputMain
            register={{ ...register('repeatPassword'), label: i18n._auth.repeatPassword }}
            error={errors?.['repeatPassword']?.message?.toString()}
            containerClassName="mb-3"
          />
          <Link className="ml-auto" href="/auth/login">
            {i18n._auth.signIn}
          </Link>
          <ButtonMain onClick={handleSubmit(onSubmit, onError)} className="mt-5 mb-3">
            {i18n._auth.createAccount}
          </ButtonMain>
          <Alert>
            <h3 className="font-medium text-sm">Пароль должен содержать:</h3>
            <ul className="mt-2 list-disc list-inside text-xs">
              <li className="mb-1">Минимум 8 символов</li>
              <li className="mb-1">Минимум 1 цифру</li>
              <li className="mb-1">1 букву лат. алфавита в нижнем регистре</li>
              <li className="mb-1">1 букву лат. алфавита в верхнем регистре</li>
              <li>Содержать минимум 1 спецсимвол, например: ! @ # ?</li>
            </ul>
          </Alert>
        </div>
      </Modal>
    </AuthViewBase>
  )
}

export default SignUp
