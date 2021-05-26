import { ICard, IHandCheckResult } from '../types'
import * as checkers from './hands'

const CHECKERS = [
  checkers.checkRoyalFlush,
  checkers.checkStraightFlush,
  checkers.checkFourOfAKind,
  checkers.checkFullHouse,
  checkers.checkFlush,
  checkers.checkStraight,
  checkers.checkThreeOfAKind,
  checkers.checkTwoPair,
  checkers.checkPair,
  checkers.checkHighCard,
]

export const bestHand = (cards: ICard[]): IHandCheckResult => {
  for (let i = 0; i < CHECKERS.length; i++) {
    const checker = CHECKERS[i]
    const result = checker(cards)

    if (result.achieved) return result
  }

  throw new Error('Result should have been High Card')
}
