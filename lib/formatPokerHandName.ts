import { IPokerHandName } from '../types'

export const formatPokerHandName = (hand: IPokerHandName): string => {
  switch (hand) {
    case 'royal_flush': return 'Royal Flush'
    case 'straight_flush': return 'Straight Flush'
    case 'four_of_a_kind': return 'Four of a Kind'
    case 'full_house': return 'Full House'
    case 'flush': return 'Flush'
    case 'straight': return 'Straight'
    case 'three_of_a_kind': return 'Three of a Kind'
    case 'two_pair': return 'Two Pair'
    case 'pair': return 'Pair'
    case 'high_card': return 'High Card'
  }
}
