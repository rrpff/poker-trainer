import Image from 'next/image'
import styled from '@emotion/styled'
import { CSSProperties } from 'react'
import { animated } from '@react-spring/web'
import { ICard, IHandGuessAccuracy } from '../types'
import { cardToDescription } from '../lib/utils'

interface IDimensions {
  width: number
  height: number
}

export interface ICardProps {
  card: ICard
  highlighttype?: IHandGuessAccuracy
  highlighted?: boolean
  width: number
  style?: CSSProperties
}

export const Card = (props: ICardProps) => {
  const src = imageSrcForProps(props)
  const dimensions = dimensionsForWidth(props.width)

  return (
    <CardImage
      {...props}
      {...dimensions}
      highlighted={props.highlighted?.toString()}
      data-testid="card"
      data-test-suit={props.card.suit}
      data-test-face={props.card.face}
      suppressHydrationWarning
    >
      <Image
        src={src}
        width={dimensions.width}
        height={dimensions.height}
        unoptimized
      />
    </CardImage>
  )
}

Card.defaultProps = {
  style: {}
}

export default Card

const CardImage = styled(animated.div)<ICardProps & IDimensions>`
  display: inline-flex;
  position: relative;

  transform-style: preserve-3d;
  backface-visibility: hidden;

  height: ${props => props.height + 20}px;
  width: ${props => props.width + 20}px;

  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

  background: #fff;
  border: ${props => props.highlighted === 'true' ?
    props.highlighttype === 'exact' ? '5px solid #1dd1a1' :
    props.highlighttype === 'close' ? '5px solid #feca57' :
    props.highlighttype === 'wrong' ? '5px solid #ff6b6b' :
    '5px solid transparent' :
    '5px solid transparent'};

  transition: border 0.3s;

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

const dimensionsForWidth = (width: number): IDimensions => {
  return { width, height: width / ASPECT_RATIO }
}

const imageSrcForProps = (props: ICardProps) => {
  const description = cardToDescription(props.card)
  return `/cards/${description}.svg`
}
