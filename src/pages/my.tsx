import withAuth from '@/components/shared/hocs/withAuth'

import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Button from '@/components/shared/Button'
import { signOut } from 'next-auth/react'

const MyPage = () => {
  return (
    <div>
      <Spacing size={100} />
      <Flex justify="center">
        <Button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</Button>
      </Flex>
    </div>
  )
}

export default withAuth(MyPage)
