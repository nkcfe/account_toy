import Input from '@/components/shared/Input'
import Top from '@/components/shared/Top'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { getSearchCards } from '@/remote/card'
import { useQuery } from 'react-query'
import Badge from '@/components/shared/Badge'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import useDebounce from '@/hooks/useDebounce'

const SearchPage = () => {
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword)

  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useRouter()

  const { data } = useQuery(
    ['cards', debouncedKeyword],
    () => getSearchCards(debouncedKeyword),
    {
      enabled: keyword !== '',
    },
  )

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input ref={inputRef} value={keyword} onChange={handleKeyword} />
      </div>
      {keyword !== '' && data?.length === 0 ? (
        <div style={{ padding: '12px 24px' }}>
          <Text>찾으시는 카드가 없습니다</Text>
        </div>
      ) : (
        <ul>
          {data?.map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow={true}
              onClick={() => navigate.push(`/card/${card.id}`)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchPage
