import { closest, distance } from 'fastest-levenshtein'
import { HAND_NAMES, IPokerHandName } from '../types'

const FACE_MATCH = `(two|three|four|five|six|seven|eight|nine|ten|jack|queen|king|ace|[0-9])`
const STARTS_WITH_FACE_REGEX = new RegExp(`^${FACE_MATCH}`, 'g')
const ENDS_WITH_FACE_REGEX = new RegExp(`${FACE_MATCH}$`, 'g')

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

  const withoutFace = cleaned
    .replace(STARTS_WITH_FACE_REGEX, '')
    .replace(ENDS_WITH_FACE_REGEX, '')
  const withoutFaceDistance = distance('high_card', withoutFace + '_card')
  if (withoutFaceDistance < 3) return 'high_card'

  return null
}
