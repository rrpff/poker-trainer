import { generatePokerHand } from '../lib/generatePokerHand'
import { HAND_NAMES, IUseHandExamplesHook } from '../types'

export const useHandExamples: IUseHandExamplesHook = () => {
  const base: any = {}
  return HAND_NAMES.reduce((results, handName) => ({
    ...results,
    [handName]: generatePokerHand(handName),
  }), base)
}
