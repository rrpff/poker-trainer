import styled from '@emotion/styled'
import { cardsMatch } from '../lib/utils'
import { ICard, IHandGuessAccuracy } from '../types'
import { SwappableCard } from './SwappableCard'

export interface ICardSequenceProps {
  cards: ICard[]
  highlightType: IHandGuessAccuracy
  highlightedCards: ICard[]
}

export const CardSequence = ({ cards, highlightType, highlightedCards }: ICardSequenceProps) => {
  return (
    <Container>
      {cards.map((card, index) =>
        <SwappableCard
          key={index}
          card={card}
          highlightType={highlightType}
          highlighted={highlightedCards.some(c => cardsMatch(c, card))}
          offset={index * 100}
        />
      )}
    </Container>
  )
}

export default CardSequence

const Container = styled.section`
  display: block;
  text-align: center;

  div {
    margin: 8px;
  }
`
