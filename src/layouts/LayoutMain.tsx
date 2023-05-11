import LogoGit from "@/shared/buttons/LogoGit"
import { useRouter } from "next/router"

interface Props extends React.ComponentProps<'div'> {}

const LayoutMain = (props: Props) => {
  const { children } = props
  const {pathname} = useRouter()
  return (
    <>
      <main>{children}</main>
      <div className="fixed top-3 right-3 z-50">
        <LogoGit color={`${pathname === '/' ? null : 'white'}`} href='https://github.com/MichaelRand0/Redux-Todo' />
      </div>
    </>
  )
}

export default LayoutMain
