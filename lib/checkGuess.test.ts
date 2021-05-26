import { HAND_NAMES, ICard, IPokerHandName } from '../types'
import { bestHand } from './bestHand'
import { checkGuess } from './checkGuess'
import { cardDescriptionToCard, createDeck, pick } from './utils'

it('returns the same cards', () => {
  const cards = randomCards()
  const result = checkGuess('high_card', cards)

  expect(result.cards).toBe(cards)
})

it('returns the same guess', () => {
  const guess = pick([...HAND_NAMES])
  const result = checkGuess(guess, [])

  expect(result.guess).toEqual(guess)
})

it('returns the best hand present', () => {
  const guess = pick([...HAND_NAMES])
  const cards = randomCards()
  const result = checkGuess(guess, cards)

  const expectedBest = bestHand(cards)

  expect(result.bestName).toEqual(expectedBest.description)
  expect(result.bestCards).toEqual(expectedBest.cards)
})

it('returns an "exact" accuracy when the guess is the same - example 1', () => {
  const cards = ['AS'].map(cardDescriptionToCard)
  const result = checkGuess('high_card', cards)

  expect(result.bestName).toEqual('high_card')
  expect(result.accuracy).toEqual('exact')
})

it('returns an "exact" accuracy when the guess is the same - example 2', () => {
  const cards = ['KS', 'KD', 'AS'].map(cardDescriptionToCard)
  const result = checkGuess('pair', cards)

  expect(result.bestName).toEqual('pair')
  expect(result.accuracy).toEqual('exact')
})

it('returns a "wrong" accuracy when the guess is wrong', () => {
  const cards = ['AS', 'AD'].map(cardDescriptionToCard)
  const result = checkGuess('high_card', cards)

  expect(result.bestName).toEqual('pair')
  expect(result.accuracy).toEqual('wrong')
})

it.each([
  'flush',
  'straight_flush',
])('returns a "close" accuracy when the guess is %s and it is a royal flush', guess => {
  const cards = ['AC', 'KC', 'QC', 'JC', 'TC', 'AD', '5D'].map(cardDescriptionToCard)
  const result = checkGuess(guess as IPokerHandName, cards)

  expect(result.bestName).toEqual('royal_flush')
  expect(result.accuracy).toEqual('close')
})

it.each([
  'flush',
  'royal_flush',
])('returns a "close" accuracy when the guess is %s and it is a straight flush', guess => {
  const cards = ['TC', '9C', '8C', '7C', '6C', 'AD', '5D'].map(cardDescriptionToCard)
  const result = checkGuess(guess as IPokerHandName, cards)

  expect(result.bestName).toEqual('straight_flush')
  expect(result.accuracy).toEqual('close')
})

it.each([
  'straight_flush',
  'royal_flush',
])('returns a "close" accuracy when the guess is %s and it is a flush', guess => {
  const cards = ['4C', '2C', '8C', 'KC', 'AC', '2D', '8D'].map(cardDescriptionToCard)
  const result = checkGuess(guess as IPokerHandName, cards)

  expect(result.bestName).toEqual('flush')
  expect(result.accuracy).toEqual('close')
})

it('returns a "close" accuracy when the guess is pair and it is a two pair', () => {
  const cards = ['4C', '4D', '2C', '2D', 'AC', '3D', '8D'].map(cardDescriptionToCard)
  const result = checkGuess('pair', cards)

  expect(result.bestName).toEqual('two_pair')
  expect(result.accuracy).toEqual('close')
})

it('returns a "close" accuracy when the guess is three of a kind and it is a four of a kind', () => {
  const cards = ['4C', '4D', '4H', '4S', 'AC', '3D', '8D'].map(cardDescriptionToCard)
  const result = checkGuess('three_of_a_kind', cards)

  expect(result.bestName).toEqual('four_of_a_kind')
  expect(result.accuracy).toEqual('close')
})

const randomCards = (limit: number = 7, picked: ICard[] = []) => {
  if (picked.length === limit) return picked
  return [...picked, pick(createDeck())]
}
