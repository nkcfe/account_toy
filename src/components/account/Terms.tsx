import { 약관목록 } from '@/constants/account'
import { Term } from '@/models/account'
import { useState } from 'react'
import Agreement from '../shared/Agreement'
import dynamic from 'next/dynamic'
const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

function Terms({ onNext }: { onNext: (termIds: string[]) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    generateInitialValues(약관목록),
  )

  const handleAgreement = (id: string, checked: boolean) => {
    console.log('id', id)
    console.log('checked', checked)
    setTermsAgreements((prevTerms) => {
      return prevTerms.map((term) =>
        term.id === id ? { ...term, checked } : term,
      )
    })
  }

  const handleAllAgreement = (
    _: React.MouseEvent<HTMLElement>,
    checked: boolean,
  ) => {
    setTermsAgreements((prevTerms) => {
      return prevTerms.map((term) => ({ ...term, checked }))
    })
  }

  const isAllTermAgree = termsAgreements.every((term) => term.checked)
  const isAllMandatoryTermAgree = termsAgreements
    .filter((term) => term.mandatory)
    .every((term) => term.checked)

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={isAllTermAgree} onChange={handleAllAgreement}>
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => (
          <Agreement.Description
            key={term.id}
            link={term.link}
            checked={term.checked}
            onChange={(_, checked) => handleAgreement(term.id, checked)}
          >
            {term.mandatory ? '[필수]' : '[선택]'}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={isAllMandatoryTermAgree === false}
        onClick={() => {
          onNext(
            termsAgreements.filter((term) => term.checked).map(({ id }) => id),
          )
        }}
      />
    </div>
  )
}

export default Terms

function generateInitialValues(terms: Term[]) {
  return terms.map((term) => ({ ...term, checked: false }))
}
