import isAuthPage from '@/helpers/isAuthPage'
import { useAuth } from '@/hooks/auth'
import { usePopup } from '@/hooks/popup'
import LogoGit from '@/shared/buttons/LogoGit'
import Dialog from '@/shared/dialogs/Dialog'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props extends React.ComponentProps<'div'> {}

const LayoutMain = (props: Props) => {
  const { children } = props
  const { pathname, push } = useRouter()
  const { popup, setPopup } = usePopup()
  const { user } = useAuth()
  useEffect(() => {
    const isAuth = isAuthPage(pathname)
    if(isAuth) {
      if(user) {
        push('/')
      }
    } else {
      if(!user) {
        push('/auth/login')
      }
    }
  }, [user, pathname])
  return (
    <>
      <main>{children}</main>
      <div className="fixed top-3 right-3 z-50">
        <LogoGit
          color={`${pathname === '/' ? null : 'white'}`}
          href="https://github.com/MichaelRand0/Redux-Todo"
        />
      </div>
      <Dialog
        variant={popup?.type === 'success' ? 'success' : 'error'}
        open={popup?.type === 'success' || popup?.type === 'error'}
        handleOpen={() => {
          popup?.toRoute && push(popup?.toRoute)
          setPopup({
            type: 'waiting',
            message: '',
          })
        }}
      >
        {popup?.message}
      </Dialog>
    </>
  )
}

export default LayoutMain
