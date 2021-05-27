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
      {HAND_NAMES.map(handName => (
        <HandContainer key={handName} data-testid={`hand-${handName}`}>
          <h2>{formatPokerHandName(handName).name}</h2>
          <HandDescription>{formatPokerHandName(handName).description}</HandDescription>

          <CardSequence
            cards={hands[handName].cards}
            highlightedCards={hands[handName].handCards}
            highlighttype="exact"
          />
        </HandContainer>
      ))}
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
