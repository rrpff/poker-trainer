import { ICard, ICardFace, ICardSuit, IPokerHandName, SUITS } from '../types'
import { cardsMatch, without } from './utils'

const byFace = (face: ICardFace) => (card: ICard) => card.face === face
const bySuit = (suit: ICardSuit) => (card: ICard) => card.suit === suit
const suitGroups = (cards: ICard[]) => SUITS.map(suit => cards.filter(bySuit(suit)))

type IHandChecker = (cards: ICard[]) => {
  achieved: boolean
  description: IPokerHandName
  cards: ICard[]
  remaining: ICard[]
}

export const royalFlush: IHandChecker = (cards: ICard[]) => {
  const requiredFaces: ICardFace[] = ['A', 'K', 'Q', 'J', 'T']
  const groups = suitGroups(cards)
  const achievedIndex = groups.findIndex(group =>
    requiredFaces.every(face => group.find(byFace(face)))
  )

  const used = (groups[achievedIndex] || []).filter(card => requiredFaces.includes(card.face))
  const remaining = without(cards, used, cardsMatch)

  return {
    achieved: achievedIndex > -1,
    description: 'royal_flush',
    cards: used,
    remaining,
  }
}
