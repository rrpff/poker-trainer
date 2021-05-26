import { closest, distance } from 'fastest-levenshtein'
import { HAND_NAMES, IPokerHandName } from '../types'

export const parseGuess = (guess: string): IPokerHandName | null => {
  const cleaned = guess
    .replace(/2/g, 'two')
    .replace(/3/g, 'three')
    .replace(/4/g, 'four')
    .replace(/\s/g, '_').toLowerCase()

  const match = HAND_NAMES.find(name => name === cleaned)
  if (match) return match

  const bestMatch = closest(cleaned, [...HAND_NAMES])
  const bestMatchDistance = distance(bestMatch, cleaned)
  if (bestMatchDistance < 3) return bestMatch as IPokerHandName

  return null
}
