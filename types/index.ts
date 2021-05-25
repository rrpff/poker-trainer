export const SUITS = [
  'clubs',
  'diamonds',
  'spades',
  'hearts',
] as const

export const FACES = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
] as const

export type ICardSuit = typeof SUITS[number]

export type ICardFace = typeof FACES[number]

export type ICardDirection =
  | 'forwards'
  | 'backwards'

export type ICard = {
  face: ICardFace
  suit: ICardSuit
}
