import Image from 'next/image'
import styled from '@emotion/styled'
import { CSSProperties } from 'react'
import { animated } from '@react-spring/web'
import { ICard, IHandGuessAccuracy } from '../types'
import { cardToDescription } from '../lib/utils'

export interface ICardProps {
  card: ICard
  highlightType: IHandGuessAccuracy
  highlighted?: boolean
  style?: CSSProperties
}

export const Card = (props: ICardProps) => {
  const src = imageSrcForProps(props)
  const dimensions = dimensionsForWidth(160)

  return (
    <CardImage {...props}>
      <Image
        src={src}
        alt={`${props.card.face} ${props.card.suit}`}
        width={dimensions.width}
        height={dimensions.height}
      />
    </CardImage>
  )
}

Card.defaultProps = {
  style: {}
}

export default Card

const CardImage = styled(animated.div)<ICardProps>`
  display: inline-flex;
  position: relative;

  transform-style: preserve-3d;
  backface-visibility: hidden;

  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

  border: ${props => props.highlighted ?
    props.highlightType === 'exact' ? '5px solid #1dd1a1' :
    props.highlightType === 'close' ? '5px solid #feca57' :
    props.highlightType === 'wrong' ? '5px solid #ff6b6b' :
    '5px solid transparent' :
    '5px solid transparent'};

  &::after {
    content: '';

    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;

    background: url('/cards/2B.svg');
    background-size: 100% 100%;

    transform: rotateY(180deg);
    transform-style: preserve-3d;
    backface-visibility: hidden;

    border-radius: 10px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  }
`

const ASPECT_RATIO = 0.7134328358

const dimensionsForWidth = (width: number) => {
  return { width, height: width / ASPECT_RATIO }
}

const imageSrcForProps = (props: ICardProps) => {
  const description = cardToDescription(props.card)
  return `/cards/${description}.svg`
}
