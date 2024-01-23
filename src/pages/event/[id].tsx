import { GetServerSidePropsContext } from 'next'
import { useQuery } from 'react-query'
import { isAfter, parseISO } from 'date-fns'

import { getEvent } from '@/remote/event'
import { Event } from '@/models/event'
import Preview from '@/components/event/Preview'
import { useAlertContext } from '@/contexts/AlertContext'

interface EventPageProps {
  initialEvent: Event
  id: string
}

const EventPage = ({ initialEvent, id }: EventPageProps) => {
  const { open } = useAlertContext()
  const { data } = useQuery(['event', id], () => getEvent(id), {
    initialData: initialEvent,
    onSuccess: (event) => {
      const isEventEnd = isAfter(new Date(), parseISO(event.endDate))

      if (isEventEnd) {
        open({
          title: `${event.title} 이벤트가 종료되었습니다.`,
          description: '다음 이벤트를 기다려주세요.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      }

      console.log(event)
    },
  })

  if (data == null) {
    return null
  }

  return <Preview data={initialEvent} mode="preview" />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query

  const event = await getEvent(id as string)

  return {
    props: { id, initialEvent: event },
  }
}

export default EventPage
