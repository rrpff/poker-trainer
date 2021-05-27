import { renderHook } from '@testing-library/react-hooks'
import { checkHand } from '../lib/hands'
import { HAND_NAMES } from '../types'
import { useHandExamples } from './useHandExamples'

it.each(HAND_NAMES)('should include an example for a %s', handName => {
  const { result } = renderHook(() => useHandExamples())

  const handResult = result.current[handName]

  expect(handResult.handName).toEqual(handName)
  expect(handResult.handCards).toEqual(checkHand(handName, handResult.cards).cards)
  expect(handResult.cards).toEqual(expect.arrayContaining(handResult.handCards))
  expect(handResult.cards).toHaveLength(7)
})
