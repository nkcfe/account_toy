import dynamic from 'next/dynamic'
import Account from '@/components/home/Account'
import { BannerSkeletop } from '@/components/home/EventBanners'
import { CreditScoreSkeleton } from '@/components/home/CreditScore'
import Spacing from '@/components/shared/Spacing'
import { CardListSkeleton } from '@/components/home/CardList'

const EventBanners = dynamic(() => import('@/components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeletop />,
})

const CreditScore = dynamic(() => import('@/components/home/CreditScore'), {
  ssr: false,
  loading: () => <CreditScoreSkeleton />,
})

const CardList = dynamic(() => import('@/components/home/CardList'), {
  ssr: false,
  loading: () => <CardListSkeleton />,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
      <CardList />
    </>
  )
}
