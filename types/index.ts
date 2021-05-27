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

export interface IPokerHand {
  handName: IPokerHandName
  handCards: ICard[]
  cards: ICard[]
}

export interface IDealer {
  deal<N extends number>(num: N): ICard[]
}

export type IGuessingGameState =
  | 'ready'
  | 'summary'

export type IUseGuessingGameHookInput = {
  dealer: IDealer
  statistics?: IStatisticsGateway
}

export type IUseGuessingGameHook = (input: IUseGuessingGameHookInput) => {
  state: IGuessingGameState
  cards: ICard[]
  relevantCards?: ICard[]
  correctHandName?: string
  correctHandDescription?: string
  accuracy?: IHandGuessAccuracy

  guess(text: string): void
  proceed(): void
}

export type IUseHistoricalGuessStatisticsHookInput = {
  statistics: IStatisticsGateway
}

export type IUseHistoricalGuessStatisticsHookResult = {
  correctGuessFrequency: number | null
  correctGuesses: number
  totalGuesses: number
}

export type IUseHistoricalGuessStatisticsHook = (input: IUseHistoricalGuessStatisticsHookInput) => {
  overall: IUseHistoricalGuessStatisticsHookResult
  hands: {
    [K in IPokerHandName]: IUseHistoricalGuessStatisticsHookResult
  }
}

export type IUseHandExamplesHook = () => {
  regenerate(handName: IPokerHandName): void
  examples: {
    [K in IPokerHandName]: {
      handName: K
      handCards: ICard[]
      cards: ICard[]
    }
  }
}

export type IHistoricalHandGuess<THand> = {
  hand: THand
  timestamp: number
  wasCorrect: boolean
}

export interface IStatisticsGateway {
  getHistoricalHandGuesses(): Promise<IHistoricalHandGuess<any>[]>
  trackGuessForHand(hand: IPokerHandName, wasCorrect: boolean): Promise<void>
}

export interface IAppDependencies {
  dealer: IDealer
  statisticsGateway: IStatisticsGateway
}
