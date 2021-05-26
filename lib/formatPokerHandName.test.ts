import { formatPokerHandName } from './formatPokerHandName'
import { IPokerHandName } from '../types'

it.each([
  { hand: 'royal_flush', expected: 'Royal Flush' },
  { hand: 'straight_flush', expected: 'Straight Flush' },
  { hand: 'four_of_a_kind', expected: 'Four of a Kind' },
  { hand: 'full_house', expected: 'Full House' },
  { hand: 'flush', expected: 'Flush' },
  { hand: 'straight', expected: 'Straight' },
  { hand: 'three_of_a_kind', expected: 'Three of a Kind' },
  { hand: 'two_pair', expected: 'Two Pair' },
  { hand: 'pair', expected: 'Pair' },
  { hand: 'high_card', expected: 'High Card' },
])('formats hand names correctly', ({ hand, expected }) => {
  expect(formatPokerHandName(hand as IPokerHandName)).toEqual(expected)
})
