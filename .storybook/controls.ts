import { createDeck } from '../lib/utils'
import { ICard } from '../types'

const cardToKey = (card: ICard) => `${card.face} of ${card.suit}`

const CARDS = createDeck()
const CARD_OPTIONS = CARDS.reduce((acc, card) => ({
  ...acc,
  [cardToKey(card)]: card,
}), {})

export const cardControl = {
  options: Object.keys(CARD_OPTIONS),
  mapping: CARD_OPTIONS,
  defaultValue: CARDS[0],
}
