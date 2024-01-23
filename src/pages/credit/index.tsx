import dynamic from 'next/dynamic'

import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing'
import CreditScoreChart from '@/components/shared/CreditScoreChart'
import ListRow from '@/components/shared/ListRow'
import useUser from '@/hooks/useUser'
import { useCallback } from 'react'
import { useAlertContext } from '@/contexts/AlertContext'
import { useRouter } from 'next/router'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  { ssr: false },
)

function CreditPage() {
  const isReviewCredit = true
  const user = useUser()
  const navigate = useRouter()
  const { open } = useAlertContext()

  const handleCheck = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능이에요.',
        description:
          '정확한 신용정보를 확인하기 위해 로그인을 먼저 진행해주세요.',
        onButtonClick: () => {
          navigate.push('/auth/signin')
        },
      })
      return
    }

    navigate.push('/credit/check')
  }, [navigate, open, user])

  return isReviewCredit ? (
    <div>
      <Spacing size={40} />
      <Flex align="center" direction="column">
        <Text typography="t4" bold={true} textAlign="center">
          나의 신용점수
        </Text>
        <Spacing size={10} />
        {/* TODO 실제 점수를 가져와서 그려준다. */}
        <CreditScoreChart score={0} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts title="추천카드" subTitle="나에게 맞는 카드 찾기" />
          }
          withArrow={true}
          onClick={() => {
            navigate.push('/card')
          }}
        />
      </ul>
      <FixedBottomButton label="신용 점수 올리기" onClick={handleCheck} />
    </div>
  ) : (
    <div>
      <Spacing size={40} />
      <Flex align="center" direction="column">
        <Text typography="t4" bold={true} textAlign="center">
          내 신용점수를 <br /> 조회하고 관리해보세요
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={0} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="정확한 신용평점"
              subTitle="대표 신용평가 기관의 데이터로 관리해요"
            />
          }
        />
        <ListRow
          contents={
            <ListRow.Texts
              title="신용점수 무료 조회"
              subTitle="신용점수에 영향없이 무료로 조회해요"
            />
          }
        />
      </ul>
      <FixedBottomButton
        label="30초만에 신용점수 관리하기"
        onClick={handleCheck}
      />
    </div>
  )
}

export default CreditPage
