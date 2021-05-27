import { knuthShuffle } from 'knuth-shuffle'
import { useState } from 'react'
import { generatePokerHand } from '../lib/generatePokerHand'
import { HAND_NAMES, IPokerHandName, IUseHandExamplesHook } from '../types'

type IHandExamples = ReturnType<IUseHandExamplesHook>['examples']

export const useHandExamples: IUseHandExamplesHook = () => {
  const base: Partial<IHandExamples> = {}
  const [examples, setExamples] = useState<Partial<IHandExamples>>(HAND_NAMES.reduce(
    (results, handName) => ({
      ...results,
      [handName]: generatePokerHand(handName, 0),
    }),
  base))

  const regenerate = (handName: IPokerHandName) => {
    const regenerated = generatePokerHand(handName, 2000)
    regenerated.cards = knuthShuffle(regenerated.cards)

    setExamples(current => ({
      ...current,
      [handName]: regenerated,
    }))
  }

  return {
    examples: examples as IHandExamples,
    regenerate,
  }
}
