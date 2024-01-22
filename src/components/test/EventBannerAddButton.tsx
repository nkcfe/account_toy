import Button from '../shared/Button'
import { store } from '@/remote/firebase'
import { EVENT_BANNERS } from '@/mock/banner'
import { COLLECTIONS } from '@constants/collections'
import { collection, doc, writeBatch } from 'firebase/firestore'

const EventBannerAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    EVENT_BANNERS.forEach((banner) => {
      const bannerRef = doc(collection(store, COLLECTIONS.EVENT_BANNER))

      batch.set(bannerRef, banner)
    })

    await batch.commit()

    alert('이벤트 배너 데이터 추가 완료')
  }
  return <Button onClick={handleButtonClick}>이벤트 배너 데이터 추가</Button>
}

export default EventBannerAddButton
