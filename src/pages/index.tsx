import dynamic from 'next/dynamic'
import Account from '@/components/home/Account'
import { BannerSkeletop } from '@/components/home/EventBanners'
import { CreditScoreSkeleton } from '@/components/home/CreditScore'
import Spacing from '@/components/shared/Spacing'

const EventBanners = dynamic(() => import('@/components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeletop />,
})

const CreditScore = dynamic(() => import('@/components/home/CreditScore'), {
  ssr: false,
  loading: () => <CreditScoreSkeleton />,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
    </>
  )
}
