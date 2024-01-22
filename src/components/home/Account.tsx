import Flex from '@shared/Flex'
import Text from '../shared/Text'
import Button from '../shared/Button'
import Spacing from '../shared/Spacing'
import Image from 'next/image'

const Account = () => {
  const hasAccount = true

  // 계좌를 보유중일때
  if (hasAccount) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text typography="t6" color="gray600">
              철 회원님의 자산
            </Text>
            <Spacing size={2} />
            <Text typography="t3" bold={true}>
              800,000,000원
            </Text>
          </Flex>
          <Button>분석</Button>
        </Flex>
      </div>
    )
  }

  // 계좌를 보유하고 있지 않다.
  // 계좌 개설중일수도, 하지만 개설 완료되지 않았다.

  // READY | DONE
  const 계좌개설상태 = 'READY'
  const title =
    계좌개설상태 === 'READY'
      ? '만들고 있으신\n계좌가 있으시군요'
      : '계좌 개설이 더 쉽고 빨라졌어요'
  const buttonLabel =
    계좌개설상태 === 'READY' ? '이어만들기' : '3분만에 개설하기'

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between">
        <Flex direction="column">
          <Text bold={true} style={{ whiteSpace: 'pre-wrap' }}>
            {title}
          </Text>
          <Spacing size={8} />
          <Button>{buttonLabel}</Button>
        </Flex>
        <Image
          src="https://cdn3.iconfinder.com/data/icons/object-emoji/50/MoneyBags-512.png"
          alt=""
          width={80}
          height={80}
        />
      </Flex>
    </div>
  )
}

export default Account
