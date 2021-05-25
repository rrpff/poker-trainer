import Image from 'next/image'
import styled from '@emotion/styled'
import { ICardDirection, ICardFace, ICardSuit } from '../types'

export interface ICardProps {
  face: ICardFace
  suit: ICardSuit
  direction: ICardDirection
}

export const Card = (props: ICardProps) => {
  const src = imageSrcForProps(props)
  const dimensions = dimensionsForWidth(160)

  return (
    <CardImage {...props}>
      <Image
        src={src}
        alt={`${props.face} ${props.suit}`}
        width={dimensions.width}
        height={dimensions.height}
      />
    </CardImage>
  )
}

const CardImage = styled.div<ICardProps>`
  display: inline-flex;
  position: relative;

  transform: rotateY(${props => props.direction === 'backwards' ? '180deg' : '0deg'});
  transform-style: preserve-3d;
  backface-visibility: hidden;

  &::after {
    content: '';

    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;

    background: url('/cards/1B.svg');
    background-size: 100% 100%;

    transform: rotateY(180deg);
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
`

const ASPECT_RATIO = 0.7134328358

const dimensionsForWidth = (width: number) => {
  return { width, height: width / ASPECT_RATIO }
}

const imageSrcForProps = (props: ICardProps) => {
  const face = props.face === '10' ? 'T' : props.face
  const suit = props.suit === 'clubs' ? 'C' :
    props.suit === 'diamonds' ? 'D' :
    props.suit === 'hearts' ? 'H' :
    props.suit === 'spades' ? 'S' :
    null

  return `/cards/${face}${suit}.svg`
}
