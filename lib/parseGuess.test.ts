import { parseGuess } from './parseGuess'

test.each([
  { scenario: 'that match exactly', guess: 'royal_flush', expected: 'royal_flush' },
  { scenario: 'that match exactly', guess: 'straight_flush', expected: 'straight_flush' },
  { scenario: 'that match exactly', guess: 'four_of_a_kind', expected: 'four_of_a_kind' },
  { scenario: 'that match exactly', guess: 'full_house', expected: 'full_house' },
  { scenario: 'that match exactly', guess: 'flush', expected: 'flush' },
  { scenario: 'that match exactly', guess: 'straight', expected: 'straight' },
  { scenario: 'that match exactly', guess: 'three_of_a_kind', expected: 'three_of_a_kind' },
  { scenario: 'that match exactly', guess: 'two_pair', expected: 'two_pair' },
  { scenario: 'that match exactly', guess: 'pair', expected: 'pair' },
  { scenario: 'that match exactly', guess: 'high_card', expected: 'high_card' },

  { scenario: 'with spaces', guess: 'royal flush', expected: 'royal_flush' },
  { scenario: 'with spaces', guess: 'straight flush', expected: 'straight_flush' },
  { scenario: 'with spaces', guess: 'four of a kind', expected: 'four_of_a_kind' },
  { scenario: 'with spaces', guess: 'full house', expected: 'full_house' },
  { scenario: 'with spaces', guess: 'flush', expected: 'flush' },
  { scenario: 'with spaces', guess: 'straight', expected: 'straight' },
  { scenario: 'with spaces', guess: 'three of a kind', expected: 'three_of_a_kind' },
  { scenario: 'with spaces', guess: 'two pair', expected: 'two_pair' },
  { scenario: 'with spaces', guess: 'pair', expected: 'pair' },
  { scenario: 'with spaces', guess: 'high card', expected: 'high_card' },

  { scenario: 'with capitalisation', guess: 'Royal Flush', expected: 'royal_flush' },
  { scenario: 'with capitalisation', guess: 'Straight Flush', expected: 'straight_flush' },
  { scenario: 'with capitalisation', guess: 'Four of a Kind', expected: 'four_of_a_kind' },
  { scenario: 'with capitalisation', guess: 'Full House', expected: 'full_house' },
  { scenario: 'with capitalisation', guess: 'Flush', expected: 'flush' },
  { scenario: 'with capitalisation', guess: 'Straight', expected: 'straight' },
  { scenario: 'with capitalisation', guess: 'Three of a Kind', expected: 'three_of_a_kind' },
  { scenario: 'with capitalisation', guess: 'Two Pair', expected: 'two_pair' },
  { scenario: 'with capitalisation', guess: 'Pair', expected: 'pair' },
  { scenario: 'with capitalisation', guess: 'High Card', expected: 'high_card' },

  { scenario: 'with numbers', guess: '4 of a kind', expected: 'four_of_a_kind' },
  { scenario: 'with numbers', guess: '3 of a kind', expected: 'three_of_a_kind' },
  { scenario: 'with numbers', guess: '2 pair', expected: 'two_pair' },

  { scenario: 'with spelling errors', guess: 'royal flus', expected: 'royal_flush' },
  { scenario: 'with spelling errors', guess: 'straigt flush', expected: 'straight_flush' },
  { scenario: 'with spelling errors', guess: 'for of a kind', expected: 'four_of_a_kind' },
  { scenario: 'with spelling errors', guess: 'fullhouse', expected: 'full_house' },
  { scenario: 'with spelling errors', guess: 'fludh', expected: 'flush' },
  { scenario: 'with spelling errors', guess: 'straiht', expected: 'straight' },
  { scenario: 'with spelling errors', guess: 'threee of a kind', expected: 'three_of_a_kind' },
  { scenario: 'with spelling errors', guess: 'two peir', expected: 'two_pair' },
  { scenario: 'with spelling errors', guess: 'pai', expected: 'pair' },
  { scenario: 'with spelling errors', guess: 'higher card', expected: 'high_card' },

  { scenario: 'that just do not match', guess: 'whatever', expected: null },
  { scenario: 'that just do not match', guess: 'cool', expected: null },
  { scenario: 'that just do not match', guess: 'great flush', expected: null },
  { scenario: 'that just do not match', guess: 'ten of a kind', expected: null },
  { scenario: 'that just do not match', guess: 'win', expected: null },
])('parses hand guesses $scenario ("$guess")', ({ guess, expected }) => {
  expect(parseGuess(guess)).toEqual(expected)
})
