import styled from '@emotion/styled'
import { useMemo, useState } from 'react'
import Measure from 'react-measure'
import { cardsMatch } from '../lib/utils'
import { ICard, IHandGuessAccuracy } from '../types'
import { SwappableCard } from './SwappableCard'

export interface ICardSequenceProps {
  cards: ICard[]
  highlighttype: IHandGuessAccuracy
  highlightedCards: ICard[]
  alwaysHighlighted?: boolean
}

export const CardSequence = (props: ICardSequenceProps) => {
  const [dimensions, setDimensions] = useState({ width: -1, height: -1 })
  const cardWidth = useMemo(() => Math.max(60, dimensions.width / 10), [dimensions])

  return (
    <Container>
      <Measure bounds onResize={rect => setDimensions(rect.bounds || { width: -1, height: -1 })}>
        {({ measureRef }) =>
          <div ref={measureRef}>
            {props.cards.map((card, index) =>
              <SwappableCard
                key={index}
                card={card}
                alwaysHighlighted={props.alwaysHighlighted}
                highlighttype={props.highlighttype}
                highlighted={props.highlightedCards.some(c => cardsMatch(c, card))}
                offset={index * 100}
                width={cardWidth}
              />
            )}
          </div>
        }
      </Measure>
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
