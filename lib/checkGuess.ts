import { IPokerHandName, ICard, IHandGuessResult } from '../types'
import { bestHand } from './bestHand'

export const checkGuess = (guess: IPokerHandName | null, cards: ICard[]): IHandGuessResult => {
  const best = bestHand(cards)
  const accuracy = checkAccuracy(guess, best.description)

  return {
    guess: guess,
    cards: cards,
    bestName: best.description,
    bestCards: best.cards,
    accuracy: accuracy,
  }
}

const checkAccuracy = (guess: IPokerHandName | null, actualHand: IPokerHandName) => {
  return actualHand === guess ? 'exact' :
    actualHand === 'royal_flush' && guess === 'flush' ? 'close' :
    actualHand === 'royal_flush' && guess === 'straight_flush' ? 'close' :
    actualHand === 'straight_flush' && guess === 'flush' ? 'close' :
    actualHand === 'straight_flush' && guess === 'royal_flush' ? 'close' :
    actualHand === 'flush' && guess === 'straight_flush' ? 'close' :
    actualHand === 'flush' && guess === 'royal_flush' ? 'close' :
    actualHand === 'two_pair' && guess === 'pair' ? 'close' :
    actualHand === 'four_of_a_kind' && guess === 'three_of_a_kind' ? 'close' :
    'wrong'
}
