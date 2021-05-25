import Image from 'next/image'
import styled from '@emotion/styled'
import { CSSProperties } from 'react'
import { animated } from '@react-spring/web'
import { ICard } from '../types'

export interface ICardProps {
  card: ICard
  style?: CSSProperties
}

export const Card = (props: ICardProps) => {
  const src = imageSrcForProps(props)
  const dimensions = dimensionsForWidth(160)

  return (
    <CardImage style={props.style || {}}>
      <Image
        src={src}
        alt={`${props.card.face} ${props.card.suit}`}
        width={dimensions.width}
        height={dimensions.height}
      />
    </CardImage>
  )
}

export default Card

const CardImage = styled(animated.div)`
  display: inline-flex;
  position: relative;

  transform-style: preserve-3d;
  backface-visibility: hidden;

  border-radius: 15px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

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

    border-radius: 15px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  }
`

const ASPECT_RATIO = 0.7134328358

const dimensionsForWidth = (width: number) => {
  return { width, height: width / ASPECT_RATIO }
}

const imageSrcForProps = (props: ICardProps) => {
  const face = props.card.face === '10' ? 'T' : props.card.face
  const suit = props.card.suit === 'clubs' ? 'C' :
    props.card.suit === 'diamonds' ? 'D' :
    props.card.suit === 'hearts' ? 'H' :
    props.card.suit === 'spades' ? 'S' :
    null

  return `/cards/${face}${suit}.svg`
}
