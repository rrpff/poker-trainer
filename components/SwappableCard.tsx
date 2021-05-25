import { useEffect, useState } from 'react'
import { useSpring, config } from '@react-spring/web'
import { ICard } from '../types'
import { Card } from './Card'

export interface ISwappableCardProps {
  card: ICard
}

export const SwappableCard = (props: ISwappableCardProps) => {
  const [rendered, setRendered] = useState(props.card)
  const [changing, setChanging] = useState(false)

  useEffect(() => {
    setChanging(props.card !== rendered)
  }, [props.card])

  const { transform } = useSpring({
    config: config.slow,
    transform: changing ? 'rotateY(360deg)' : 'rotateY(0deg)',
    completion: changing ? 2 : 0,
    onChange: {
      completion: (value: number) => {
        if (value >= 1) {
          setRendered(props.card)
          setChanging(false)
        }
      }
    }
  })

  return (
    <Card
      card={rendered}
      style={{ transform }}
    />
  )
}

export default SwappableCard
