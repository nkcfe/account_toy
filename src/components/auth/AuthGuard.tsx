import { useSession } from 'next-auth/react'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useSession()

  if (status === 'loading') {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
