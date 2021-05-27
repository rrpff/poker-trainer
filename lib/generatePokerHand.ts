import { IPokerHand, IPokerHandName } from '../types'
import { knuthDealer } from './dealers/knuth'
import { checkHand } from './hands'
import { cardDescriptionToCard } from './utils'

export const generatePokerHand = (handName: IPokerHandName, maxAttempts: number = MAX_ATTEMPTS, attempts: number = 0): IPokerHand => {
  const cards = attempts < maxAttempts
    ? knuthDealer.deal(7)
    : FALLBACKS[handName].map(cardDescriptionToCard)

  const results = checkHand(handName, cards)

  if (!results.achieved) return generatePokerHand(handName, maxAttempts, attempts + 1)

  return {
    handName,
    handCards: results.cards,
    cards: cards,
  }
}

export const MAX_ATTEMPTS = 30
export const FALLBACKS: { [K in IPokerHandName]: string[] } = {
  royal_flush: ['AC', 'KC', 'QC', 'JC', 'TC', 'AD', '5D'],
  straight_flush: ['8C', '7C', '6C', '5C', '4C', '2C', 'TC'],
  four_of_a_kind: ['AC', 'KC', 'KD', 'KH', 'KS', '9D', '4C'],
  full_house: ['AC', 'AD', 'AS', '9C', '9D', '6D', '5D'],
  flush: ['4C', '2C', '8C', 'KC', 'AC', '2D', '8D'],
  straight: ['9C', '8D', '7S', '6D', '5H', 'KC', 'AC'],
  three_of_a_kind: ['7S', '7D', '7C', '8D', '9D', 'TD', 'JD'],
  two_pair: ['AS', 'KS', 'KD', 'AC', '5D', '4C', 'JC'],
  pair: ['5S', '5D', '3C', '2S', '4D', '9C', 'JC'],
  high_card: ['5S', '6D', '3C', 'TS', '8D', '4C', 'JC'],
}
