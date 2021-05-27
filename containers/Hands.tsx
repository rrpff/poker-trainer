import styled from '@emotion/styled'
import { Fragment } from 'react'
import CardSequence from '../components/CardSequence'
import { useHandExamples } from '../hooks/useHandExamples'
import { formatPokerHandName } from '../lib/formatPokerHandName'
import { HAND_NAMES } from '../types'

export const Hands = () => {
  const hands = useHandExamples()

  return (
    <Fragment>
      {HAND_NAMES.map(handName => {
        const formatted = formatPokerHandName(handName)
        const result = hands[handName]

        return (
          <HandContainer key={handName} data-testid={`hand-${handName}`}>
            <h2>{formatted.name}</h2>
            <HandDescription>{formatted.description}</HandDescription>

            <CardSequence
              cards={result.cards}
              highlightedCards={result.handCards}
              highlighttype="exact"
            />
          </HandContainer>
        )
      })}
    </Fragment>
  )
}

const HandContainer = styled.section`
  padding-bottom: 50px;
`

const HandDescription = styled.p`
  color: #576574;
`

export default Hands
