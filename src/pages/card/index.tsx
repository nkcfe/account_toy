import { QueryClient, dehydrate, useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

import { getCards } from '@/remote/card'
import ListRow from '@/components/shared/ListRow'
import { useCallback } from 'react'
import Badge from '@/components/shared/Badge'
import { useRouter } from 'next/router'
import Top from '@/components/shared/Top'
import Input from '@/components/shared/Input'

const CardListPage = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['cards'], ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: (snapShot) => {
      return snapShot.lastVisible
    },
  })

  const navigate = useRouter()

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }, [hasNextPage, fetchNextPage, isFetching])

  if (data == null) return null

  const cards = data?.pages.map(({ items }) => items).flat()

  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input
          onFocus={() => {
            navigate.push('card/search')
          }}
        />
      </div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => (
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
      </InfiniteScroll>
    </div>
  )
}

// 서버에서 렌더링할 때만 호출됩니다.
export const getServerSideProps = async () => {
  console.log(getServerSideProps)

  const client = new QueryClient()

  //서버에서 먼저 수행되어야 할 쿼리를 prefetchInfiniteQuery로 미리 호출합니다.
  await client.prefetchInfiniteQuery(['cards'], () => getCards())

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  }
}

export default CardListPage
