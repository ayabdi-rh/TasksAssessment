import { useLogOutMutation } from '../../auth/api/auth'

const Header = () => {
  const { mutate: logout } = useLogOutMutation()

  return (
    <div className="text-3xl w-full border-b pb-1 flex justify-between">
      <h1>Tasks</h1>
      <div
        className="text-sm mt-auto text-blue-500 cursor-pointer pb-1 hover:underline"
        onClick={() => logout()}
      >
        Sign Out →
      </div>
    </div>
  )
}

export default Header
