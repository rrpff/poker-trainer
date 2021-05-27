import { useEffect, useState } from 'react'
import { IHistoricalHandGuess, IPokerHandName, IUseHistoricalGuessStatisticsHook } from '../types'

export const useHistoricalGuessStatistics: IUseHistoricalGuessStatisticsHook = input => {
  const [results, setResults] = useState<ReturnType<IUseHistoricalGuessStatisticsHook>>({
    overall: { correctGuessFrequency: null },
    hands: {
      royal_flush: { correctGuessFrequency: null },
      straight_flush: { correctGuessFrequency: null },
      four_of_a_kind: { correctGuessFrequency: null },
      full_house: { correctGuessFrequency: null },
      flush: { correctGuessFrequency: null },
      straight: { correctGuessFrequency: null },
      three_of_a_kind: { correctGuessFrequency: null },
      two_pair: { correctGuessFrequency: null },
      pair: { correctGuessFrequency: null },
      high_card: { correctGuessFrequency: null },
    },
  })

  useEffect(() => {
    input.statistics.getHistoricalHandGuesses().then(guesses => {
      const resultForArray = (arr: IHistoricalHandGuess<any>[]) => {
        if (arr.length === 0) return {
          correctGuessFrequency: null,
        }

        const numCorrect = arr.filter(g => g.wasCorrect).length
        const numTotal = arr.length

        return {
          correctGuessFrequency: numCorrect / numTotal,
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
