import { bestHand } from './bestHand'
import { cardDescriptionToCard } from './utils'

test.each([
  { cards: ['AC', 'KC', 'QC', 'JC', 'TC', 'AD', '5D'], expected: 'royal_flush' },
  { cards: ['8C', '7C', '6C', '5C', '4C', '2C', '1C'], expected: 'straight_flush' },
  { cards: ['AC', 'KC', 'KD', 'KH', 'KS', '9D', '4C'], expected: 'four_of_a_kind' },
  { cards: ['AC', 'AD', 'AS', '9C', '9D', '6D', '5D'], expected: 'full_house' },
  { cards: ['4C', '2C', '8C', 'KC', 'AC', '2D', '8D'], expected: 'flush' },
  { cards: ['9C', '8D', '7S', '6D', '5H', 'KC', 'AC'], expected: 'straight' },
  { cards: ['7S', '7D', '7C', '8D', '9D', 'TD', 'JD'], expected: 'straight_flush' },
  { cards: ['6S', '6D', '6C', '8D', '9D', 'TD', 'JD'], expected: 'flush' },
  { cards: ['6S', '6D', '6C', '8D', '9S', 'TD', 'QD'], expected: 'three_of_a_kind' },
  { cards: ['AS', 'KS', 'KD', 'AC', '5D', '4C', 'JC'], expected: 'two_pair' },
  { cards: ['5S', '5D', '3C', '2S', '4D', '9C', 'JC'], expected: 'pair' },
  { cards: ['5S', '6D', '3C', 'TS', '8D', '4C', 'JC'], expected: 'high_card' }
])('returns the best hand for the given cards', ({ cards, expected }) => {
  const cardObjects = cards.map(cardDescriptionToCard)
  expect(bestHand(cardObjects).description).toEqual(expected)
})
