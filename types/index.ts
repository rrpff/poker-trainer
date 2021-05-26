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
  'T',
  'J',
  'Q',
  'K',
  'A',
] as const

export const HAND_NAMES = [
  'royal_flush',
  'straight_flush',
  'four_of_a_kind',
  'full_house',
  'flush',
  'straight',
  'three_of_a_kind',
  'two_pair',
  'pair',
  'high_card',
] as const

export type ICardSuit = typeof SUITS[number]

export type ICardFace = typeof FACES[number]

export type IPokerHandName = typeof HAND_NAMES[number]

export type ICardDirection =
  | 'forwards'
  | 'backwards'

export type ICard = {
  face: ICardFace
  suit: ICardSuit
}

export type IHandCheckResult = {
  achieved: boolean
  description: IPokerHandName
  cards: ICard[]
  remaining: ICard[]
}

export type IHandChecker = (cards: ICard[]) => IHandCheckResult

export type IHandGuessAccuracy =
  | 'exact'
  | 'close'
  | 'wrong'

export interface IHandGuessResult {
  guess: IPokerHandName | null
  bestName: IPokerHandName
  bestCards: ICard[]
  cards: ICard[]
  accuracy: IHandGuessAccuracy
}

export interface IDealer {
  deal<N extends number>(num: N): ICard[]
}

export interface IAppDependencies {
  dealer: IDealer
}
