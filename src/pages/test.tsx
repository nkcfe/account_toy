import CardListAddButton from '@/components/test/CardListAddButton'
import EventBannerAddButton from '@/components/test/EventBannerAddButton'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing'
import EventForm from '@/components/test/EventForm'

const test = () => {
  return (
    <Flex direction="column">
      <Text>배너</Text>
      <EventBannerAddButton />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <Text bold={true}>카드</Text>
      <CardListAddButton />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <EventForm />
    </Flex>
  )
}

export default test
