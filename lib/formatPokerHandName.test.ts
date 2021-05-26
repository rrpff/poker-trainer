import { formatPokerHandName } from './formatPokerHandName'
import { IPokerHandName } from '../types'

it.each([
  {
      hand: 'royal_flush',
      expected: { name: 'Royal Flush', description: 'Ace, King, Queen, Jack, and Ten, all in the same suit' }
  },
  {
      hand: 'straight_flush',
      expected: { name: 'Straight Flush', description: 'Sequence of five cards, all in the same suit' }
  },
  {
      hand: 'four_of_a_kind',
      expected: { name: 'Four of a Kind', description: 'Four cards with the same face' }
  },
  {
      hand: 'full_house',
      expected: { name: 'Full House', description: 'Three of a Kind and a Pair' }
  },
  {
      hand: 'flush',
      expected: { name: 'Flush', description: 'Five cards of the same suit, but not in a sequence' }
  },
  {
      hand: 'straight',
      expected: { name: 'Straight', description: 'Five cards in a sequence, but not the same suit' }
  },
  {
      hand: 'three_of_a_kind',
      expected: { name: 'Three of a Kind', description: 'Three cards with the same face' }
  },
  {
      hand: 'two_pair',
      expected: { name: 'Two Pair', description: 'Not one Pair, but two' }
  },
  {
      hand: 'pair',
      expected: { name: 'Pair', description: 'Two cards with the same face' }
  },
  {
      hand: 'high_card',
      expected: { name: 'High Card', description: 'The highest face card, when there are no other matches. Ace high.' }
  },
])('formats hand names correctly', ({ hand, expected }) => {
  expect(formatPokerHandName(hand as IPokerHandName)).toEqual(expected)
})
