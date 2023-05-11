import { useAuth } from "@/hooks/auth"
import ButtonMain from "../buttons/ButtonMain"

interface Props extends React.ComponentProps<'div'> {

}

const Profile = (props: Props) => {
  const {user, logout} = useAuth()
  return (
    <div className='flex items-center h-10'>
      <span className='text-white text-lg bg-main h-full p-2 flex items-center justify-center mr-2'>{user?.login}</span>
      <ButtonMain className='max-w-[200px]' onClick={() => logout()}>Выйти</ButtonMain>
    </div>
  )
}

export default Profile