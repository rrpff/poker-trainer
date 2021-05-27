import { useEffect, useState } from 'react'
import { IHistoricalHandGuess, IPokerHandName, IUseHistoricalGuessStatisticsHook } from '../types'

export const useHistoricalGuessStatistics: IUseHistoricalGuessStatisticsHook = input => {
  const [results, setResults] = useState<ReturnType<IUseHistoricalGuessStatisticsHook>>(DEFAULT_RESULTS)

  useEffect(() => {
    input.statistics.getHistoricalHandGuesses().then(guesses => {
      const resultForArray = (arr: IHistoricalHandGuess<any>[]) => {
        if (arr.length === 0) return NULL_RESULT

        const numCorrect = arr.filter(g => g.wasCorrect).length
        const numTotal = arr.length

        return {
          correctGuessFrequency: numCorrect / numTotal,
          correctGuesses: numCorrect,
          totalGuesses: numTotal,
        }
      }

      const resultForHand = (hand: IPokerHandName) => {
        const handGuesses = guesses.filter(g => g.hand === hand)
        return resultForArray(handGuesses)
      }

      setResults({
        overall: resultForArray(guesses),
        hands: {
          royal_flush: resultForHand('royal_flush'),
          straight_flush: resultForHand('straight_flush'),
          four_of_a_kind: resultForHand('four_of_a_kind'),
          full_house: resultForHand('full_house'),
          flush: resultForHand('flush'),
          straight: resultForHand('straight'),
          three_of_a_kind: resultForHand('three_of_a_kind'),
          two_pair: resultForHand('two_pair'),
          pair: resultForHand('pair'),
          high_card: resultForHand('high_card'),
        },
      })
    })
  }, [])

  return results
}

const NULL_RESULT = { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 }
const DEFAULT_RESULTS = {
  overall: NULL_RESULT,
  hands: {
    royal_flush: NULL_RESULT,
    straight_flush: NULL_RESULT,
    four_of_a_kind: NULL_RESULT,
    full_house: NULL_RESULT,
    flush: NULL_RESULT,
    straight: NULL_RESULT,
    three_of_a_kind: NULL_RESULT,
    two_pair: NULL_RESULT,
    pair: NULL_RESULT,
    high_card: NULL_RESULT,
  },
}
