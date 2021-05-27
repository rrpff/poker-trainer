import { HAND_NAMES } from '../types'
import { LocalstorageStatisticsGateway, LOCALSTORAGE_STATISTICS_KEY } from './LocalstorageStatisticsGateway'

beforeEach(() => {
  window.localStorage.removeItem(LOCALSTORAGE_STATISTICS_KEY)
})

it('should return none when there are no historical hand guesses', async () => {
  const gateway = new LocalstorageStatisticsGateway()

  expect(await gateway.getHistoricalHandGuesses()).toEqual({
    royal_flush: [],
    straight_flush: [],
    four_of_a_kind: [],
    full_house: [],
    flush: [],
    straight: [],
    three_of_a_kind: [],
    two_pair: [],
    pair: [],
    high_card: [],
  })
})

it.each(HAND_NAMES)('should include results when there are historical guesses', async hand => {
  const timestamp = Math.random()
  jest.spyOn(Date, 'now').mockReturnValue(timestamp)

  const gateway = new LocalstorageStatisticsGateway()

  await gateway.trackGuessForHand(hand, true)

  const guesses = await gateway.getHistoricalHandGuesses()

  expect(guesses[hand]).toEqual([
    { hand, timestamp, wasCorrect: true }
  ])
})

it.each(HAND_NAMES)('should remember when guesses were incorrect', async hand => {
  const timestamp = Math.random()
  jest.spyOn(Date, 'now').mockReturnValue(timestamp)

  const gateway = new LocalstorageStatisticsGateway()

  await gateway.trackGuessForHand(hand, false)

  const guesses = await gateway.getHistoricalHandGuesses()

  expect(guesses[hand]).toEqual([
    { hand, timestamp, wasCorrect: false }
  ])
})

it.each(HAND_NAMES)('should remember more than one guess for a hand', async hand => {
  const timestamp = Math.random()
  jest.spyOn(Date, 'now').mockReturnValue(timestamp)

  const gateway = new LocalstorageStatisticsGateway()

  await gateway.trackGuessForHand(hand, true)
  await gateway.trackGuessForHand(hand, false)
  await gateway.trackGuessForHand(hand, true)

  const guesses = await gateway.getHistoricalHandGuesses()

  expect(guesses[hand]).toEqual([
    { hand, timestamp, wasCorrect: true },
    { hand, timestamp, wasCorrect: false },
    { hand, timestamp, wasCorrect: true },
  ])
})

it.each(HAND_NAMES)('should remember the time each statistic was recorded', async hand => {
  const timestamp1 = Math.random()
  const timestamp2 = Math.random()

  jest.spyOn(Date, 'now')
    .mockReturnValueOnce(timestamp1)
    .mockReturnValueOnce(timestamp2)

  const gateway = new LocalstorageStatisticsGateway()

  await gateway.trackGuessForHand(hand, true)
  await gateway.trackGuessForHand(hand, false)

  const guesses = await gateway.getHistoricalHandGuesses()

  expect(guesses[hand]).toEqual([
    { hand, timestamp: timestamp1, wasCorrect: true },
    { hand, timestamp: timestamp2, wasCorrect: false },
  ])
})

it.each(HAND_NAMES)('should remember the time each statistic was recorded', async hand => {
  const timestamp1 = Math.random()
  const timestamp2 = Math.random()

  jest.spyOn(Date, 'now')
    .mockReturnValueOnce(timestamp1)
    .mockReturnValueOnce(timestamp2)

  const gateway = new LocalstorageStatisticsGateway()

  await gateway.trackGuessForHand(hand, true)
  await gateway.trackGuessForHand(hand, false)

  const guesses = await gateway.getHistoricalHandGuesses()

  expect(guesses[hand]).toEqual([
    { hand, timestamp: timestamp1, wasCorrect: true },
    { hand, timestamp: timestamp2, wasCorrect: false },
  ])
})

it.each(HAND_NAMES)('should remember guesses for different hands', async hand => {
  const gateway = new LocalstorageStatisticsGateway()

  await gateway.trackGuessForHand('royal_flush', true)
  await gateway.trackGuessForHand('high_card', true)
  await gateway.trackGuessForHand('high_card', true)

  const guesses = await gateway.getHistoricalHandGuesses()

  expect(guesses.royal_flush).toHaveLength(1)
  expect(guesses.high_card).toHaveLength(2)
})

it.each(HAND_NAMES)('should remember guesses between gateways', async hand => {
  const gateway1 = new LocalstorageStatisticsGateway()
  const gateway2 = new LocalstorageStatisticsGateway()

  await gateway1.trackGuessForHand('royal_flush', true)
  await gateway2.trackGuessForHand('high_card', true)

  const guesses = await gateway2.getHistoricalHandGuesses()

  expect(guesses.royal_flush).toHaveLength(1)
  expect(guesses.high_card).toHaveLength(1)
})
