import Modal from '@/shared/modal/Modal'
import AuthViewBase from './components/AuthViewBase'
import Title from '@/shared/typography/Title'
import { i18n } from '@/locales'
import InputMain from '@/shared/inputs/InputMain'
import Link from '@/shared/typography/Link'
import ButtonMain from '@/shared/buttons/ButtonMain'

interface Props extends React.ComponentProps<'div'> {}

const SignUp = (props: Props) => {
  return (
    <AuthViewBase>
      <Modal>
        <Title tag="h2" className="mb-5">
          {i18n._auth.registration}
        </Title>
        <InputMain error="Error message" containerClassName="mb-3" label={i18n._auth.login} />
        <InputMain containerClassName="mb-3" label={i18n._auth.password} />
        <InputMain containerClassName="mb-3" label={i18n._auth.repeatPassword} />
        <Link className="ml-auto" href="/auth/login">
          {i18n._auth.signIn}
        </Link>
        <ButtonMain className="mt-10">{i18n._auth.createAccount}</ButtonMain>
      </Modal>
    </AuthViewBase>
  )
}

export default SignUp
