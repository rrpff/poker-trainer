import { renderHook, act } from '@testing-library/react-hooks'
import { checkHand } from '../lib/hands'
import { HAND_NAMES, IPokerHandName } from '../types'
import { useHandExamples } from './useHandExamples'

it.each(HAND_NAMES)('includes an example for a %s', handName => {
  const { result } = renderHook(() => useHandExamples())

  const handResult = result.current.examples[handName]

  expect(handResult.handName).toEqual(handName)
  expect(handResult.handCards).toEqual(checkHand(handName, handResult.cards).cards)
  expect(handResult.cards).toEqual(expect.arrayContaining(handResult.handCards))
  expect(handResult.cards).toHaveLength(7)
})

it.each([
  'pair' as IPokerHandName,
  'high_card' as IPokerHandName,
])('supports generating another example of a %s', handName => {
  const { result } = renderHook(() => useHandExamples())

  const initialResult = result.current.examples[handName]
  act(() => result.current.regenerate(handName))

  const regeneratedResult = result.current.examples[handName]
  expect(regeneratedResult).not.toEqual(initialResult)
})
