import styled from '@emotion/styled'
import { ICard } from '../types'
import { SwappableCard } from './SwappableCard'

export interface ICardSequenceProps {
  cards: ICard[]
}

export const CardSequence = ({ cards }: ICardSequenceProps) => {
  return (
    <Container>
      {cards.map((card, index) =>
        <SwappableCard
          key={index}
          card={card}
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
