import { IPokerHandName } from '../types'

export const formatPokerHandName = (hand: IPokerHandName): { name: string, description: string } => {
  switch (hand) {
    case 'royal_flush':
      return { name: 'Royal Flush', description: 'Ace, King, Queen, Jack, and Ten, all in the same suit' }
    case 'straight_flush':
      return { name: 'Straight Flush', description: 'Sequence of five cards, all in the same suit' }
    case 'four_of_a_kind':
      return { name: 'Four of a Kind', description: 'Four cards with the same face' }
    case 'full_house':
      return { name: 'Full House', description: 'Three of a Kind and a Pair' }
    case 'flush':
      return { name: 'Flush', description: 'Five cards of the same suit, but not in a sequence' }
    case 'straight':
      return { name: 'Straight', description: 'Five cards in a sequence, but not the same suit' }
    case 'three_of_a_kind':
      return { name: 'Three of a Kind', description: 'Three cards with the same face' }
    case 'two_pair':
      return { name: 'Two Pair', description: 'Not one Pair, but two' }
    case 'pair':
      return { name: 'Pair', description: 'Two cards with the same face' }
    case 'high_card':
      return { name: 'High Card', description: 'The highest face card, when there are no other matches. Ace high.' }
  }
}
