import { HAND_NAMES } from '../types'
import { checkHand } from './hands'
import { cardDescriptionToCard } from './utils'
import { generatePokerHand, FALLBACKS, MAX_ATTEMPTS } from './generatePokerHand'

it.each(HAND_NAMES)('should return the correct hand name: %s', handName => {
  const hand = generatePokerHand(handName)
  expect(hand.handName).toEqual(handName)
})

it.each(HAND_NAMES)('should return cards containing a %s', handName => {
  const hand = generatePokerHand(handName)
  expect(checkHand(handName, hand.cards).achieved).toEqual(true)
})

it.each(HAND_NAMES)('should return which cards contribute to the %s', handName => {
  const hand = generatePokerHand(handName)
  expect(checkHand(handName, hand.cards).cards).toEqual(hand.handCards)
})

it.each(HAND_NAMES)('should return a fallback for %s when reaching max attempts', handName => {
  const hand = generatePokerHand(handName, MAX_ATTEMPTS)
  expect(hand.cards).toEqual(FALLBACKS[handName].map(cardDescriptionToCard))
})

it('should return seven cards', () => {
  const hand = generatePokerHand('high_card')

  expect(hand.cards).toHaveLength(7)
})
