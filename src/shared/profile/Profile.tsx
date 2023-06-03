import { useAuth } from "@/hooks/auth"
import ButtonMain from "../buttons/ButtonMain"
import { useRouter } from "next/router"
import { useEffect } from "react"

interface Props extends React.ComponentProps<'div'> {

}

const Profile = (props: Props) => {
  const {user, verify, setUser, logout} = useAuth()
  const {push} = useRouter()
  const logoutHandler = async () => {
    logout().then(() => {
      push('/auth/login')
    })
  }
  useEffect(() => {
    verify().then((resp:any) => {
      if(resp?.data?.data?.message !== 'Token is valid') {
        setUser(null)
      }
      setUser(resp?.data?.data?.user)
    })
  }, [])
  return (
    <div className='flex items-center h-10'>
      <span className='text-white text-lg bg-main h-full p-2 flex items-center justify-center mr-2'>{user}</span>
      <ButtonMain className='max-w-[200px]' onClick={logoutHandler}>Выйти</ButtonMain>
    </div>
  )
}

export default Profile