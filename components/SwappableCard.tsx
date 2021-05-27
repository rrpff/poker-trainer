import { useEffect, useState } from 'react'
import { useSpring, config } from '@react-spring/web'
import { ICard, IHandGuessAccuracy } from '../types'
import { Card } from './Card'

export interface ISwappableCardProps {
  card: ICard
  highlighttype?: IHandGuessAccuracy
  highlighted?: boolean
  alwaysHighlighted?: boolean
  width: number
  offset?: number
}

export const SwappableCard = (props: ISwappableCardProps) => {
  const [rendered, setRendered] = useState(props.card)
  const [highlighted, setHighlighted] = useState(props.highlighted)
  const [changing, setChanging] = useState(false)

  useEffect(() => {
    const willChange = props.card !== rendered
    if (!willChange) return

    setHighlighted(false)

    setTimeout(() => {
      setChanging(true)
    }, props.offset || 0)
  }, [props.card, props.offset])

  const { transform } = useSpring({
    config: config.slow,
    transform: changing ? 'rotateY(360deg)' : 'rotateY(0deg)',
    completion: changing ? 2 : 0,
    onChange: {
      completion: (value: number) => {
        if (value >= 1) {
          setRendered(props.card)
          setHighlighted(props.highlighted)
          setChanging(false)
        }
      }
    }
  })

  return (
    <Card
      card={rendered}
      highlighttype={props.highlighttype}
      highlighted={props.alwaysHighlighted ? highlighted : props.highlighted}
      width={props.width}
      style={{ transform }}
    />
  )
}

export default SwappableCard
