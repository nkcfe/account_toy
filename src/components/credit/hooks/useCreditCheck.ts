import { useQuery } from 'react-query'

import { CHECK_STATUS } from '@/constants/credit'

interface useCreditCheckProps {
  onSuccess: (creditScore: number) => void
  onError: () => void
  enabled: boolean
}

function useCredith