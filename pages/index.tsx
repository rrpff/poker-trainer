import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { ICard } from '../types'
import { createDeck } from '../lib/utils'

function pick <T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const randomCards = (num: number): ICard[] => {
  const deck = createDeck()
  const cards = []
  for (let i = 0; i < num; i++) cards.push(pick(deck))

  return cards
}

const CardSequence = dynamic(() => import('../components/CardSequence'), { ssr: false })

export default function Home() {
  const [cards, setCards] = useState(randomCards(7))

  return (
    <div>
      <Head>
        <title>Poker Trainer</title>
      </Head>

      <button onClick={() => setCards(randomCards(7))}>
        change
      </button>

      <CardSequence cards={cards.slice(0,5)} />
      <CardSequence cards={cards.slice(5,7)} />
    </div>
  )
}
