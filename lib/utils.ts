import { FACES, SUITS, ICard, ICardFace } from '../types'

export const createDeck = (): ICard[] =>
  flatten(SUITS.map(suit => FACES.map(face => ({ suit, face }))))

export const cardToDescription = (card: ICard): string => {
  const face = card.face
  const suit = card.suit === 'clubs' ? 'C' :
    card.suit === 'diamonds' ? 'D' :
    card.suit === 'hearts' ? 'H' :
    card.suit === 'spades' ? 'S' :
    null

  return `${face}${suit}`
}

export const cardDescriptionToCard = (description: string): ICard => {
  const chars = description.split('')
  const suitChar = chars[chars.length - 1]
  const face = chars.slice(0, chars.length - 1).join('') as ICardFace

  switch (suitChar) {
    case 'C': return { face, suit: 'clubs' }
    case 'S': return { face, suit: 'spades' }
    case 'H': return { face, suit: 'hearts' }
    case 'D': return { face, suit: 'diamonds' }
    default: throw new Error('Invalid suit')
  }
}

export const flatten = <T>(arrs: T[][]): T[] => {
  return arrs.reduce((final, arr) => {
    return [...final, ...arr]
  }, [])
}
