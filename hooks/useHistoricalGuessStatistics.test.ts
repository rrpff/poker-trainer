import { renderHook } from '@testing-library/react-hooks'
import { InMemoryStatisticsGateway } from '../gateways/InMemoryStatisticsGateway'
import { HAND_NAMES } from '../types'
import { useHistoricalGuessStatistics } from './useHistoricalGuessStatistics'

it('should return null results when there have been no guesses', async () => {
  const statistics = new InMemoryStatisticsGateway()
  const { result, waitForNextUpdate } = renderHook(() => subject({ statistics }))

  await waitForNextUpdate()

  expect(result.current).toEqual({
    overall: { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 },
    hands: {
      royal_flush: { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 },
      straight_flush: { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 },
      four_of_a_kind: { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 },
      full_house: { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 },
      flush: { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 },
      straight: { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 },
      three_of_a_kind: { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 },
      two_pair: { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 },
      pair: { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 },
      high_card: { correctGuessFrequency: null, correctGuesses: 0, totalGuesses: 0 },
    },
  })
})

it.each(HAND_NAMES)('should return a hand result of 1 when 100% of guesses have been correct', async hand => {
  const statistics = new InMemoryStatisticsGateway()
  await statistics.trackGuessForHand(hand, true)

  const { result, waitForNextUpdate } = renderHook(() => subject({ statistics }))

  await waitForNextUpdate()

  expect(result.current.hands[hand]).toEqual({
    correctGuessFrequency: 1,
    correctGuesses: 1,
    totalGuesses: 1,
  })
})

it.each(HAND_NAMES)('should return a hand result of 0 when 100% of guesses have been wrong', async hand => {
  const statistics = new InMemoryStatisticsGateway()
  await statistics.trackGuessForHand(hand, false)

  const { result, waitForNextUpdate } = renderHook(() => subject({ statistics }))

  await waitForNextUpdate()

  expect(result.current.hands[hand]).toEqual({
    correctGuessFrequency: 0,
    correctGuesses: 0,
    totalGuesses: 1,
  })
})

it.each(HAND_NAMES)('should return a hand result of 0.5 when 50% of guesses have been correct', async hand => {
  const statistics = new InMemoryStatisticsGateway()
  await statistics.trackGuessForHand(hand, true)
  await statistics.trackGuessForHand(hand, false)

  const { result, waitForNextUpdate } = renderHook(() => subject({ statistics }))

  await waitForNextUpdate()

  expect(result.current.hands[hand]).toEqual({
    correctGuessFrequency: 0.5,
    correctGuesses: 1,
    totalGuesses: 2,
  })
})

it.each(HAND_NAMES)('should return an overall result - example 1', async () => {
  const statistics = new InMemoryStatisticsGateway()
  await statistics.trackGuessForHand('flush', true)
  await statistics.trackGuessForHand('straight', false)

  const { result, waitForNextUpdate } = renderHook(() => subject({ statistics }))

  await waitForNextUpdate()

  expect(result.current.overall).toEqual({
    correctGuessFrequency: 0.5,
    correctGuesses: 1,
    totalGuesses: 2,
  })
})

it.each(HAND_NAMES)('should return an overall result - example 2', async () => {
  const statistics = new InMemoryStatisticsGateway()
  await statistics.trackGuessForHand('royal_flush', true)
  await statistics.trackGuessForHand('high_card', false)
  await statistics.trackGuessForHand('high_card', true)
  await statistics.trackGuessForHand('pair', true)
  await statistics.trackGuessForHand('two_pair', true)

  const { result, waitForNextUpdate } = renderHook(() => subject({ statistics }))

  await waitForNextUpdate()

  expect(result.current.overall).toEqual({
    correctGuessFrequency: 0.8,
    correctGuesses: 4,
    totalGuesses: 5,
  })
})

const subject = useHistoricalGuessStatistics
