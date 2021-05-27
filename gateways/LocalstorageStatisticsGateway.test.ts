import { HAND_NAMES } from '../types'
import { LocalstorageStatisticsGateway, LOCALSTORAGE_STATISTICS_KEY } from './LocalstorageStatisticsGateway'
import { runStatisticsGatewayTests } from './runStatisticsGatewayTests'

beforeEach(() => {
  window.localStorage.removeItem(LOCALSTORAGE_STATISTICS_KEY)
})

runStatisticsGatewayTests(() => new LocalstorageStatisticsGateway())

it.each(HAND_NAMES)('should remember guesses between gateways', async hand => {
  const gateway1 = new LocalstorageStatisticsGateway()
  const gateway2 = new LocalstorageStatisticsGateway()

  await gateway1.trackGuessForHand('royal_flush', true)
  await gateway2.trackGuessForHand('high_card', true)

  const guesses = await gateway2.getHistoricalHandGuesses()

  expect(guesses).toHaveLength(2)
})
