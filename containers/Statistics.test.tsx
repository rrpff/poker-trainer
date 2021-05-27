import { render, screen } from '@testing-library/react'
import { DependencyProvider } from 'react-use-dependency'
import { InMemoryStatisticsGateway } from '../gateways/InMemoryStatisticsGateway'
import { HAND_NAMES, IAppDependencies, IStatisticsGateway } from '../types'
import { Statistics } from './Statistics'

it.each(HAND_NAMES)('displays 100% when all guesses overall have been correct', async hand => {
  const statisticsGateway = new InMemoryStatisticsGateway()
  await statisticsGateway.trackGuessForHand(hand, true)
  await statisticsGateway.trackGuessForHand(hand, true)
  subject({ statisticsGateway })

  const handEl = await screen.findByTestId(`statistics-overall`)
  expect(handEl.innerHTML).toEqual('100%')
})

it.each(HAND_NAMES)('displays 0% when all guesses overall have been correct', async hand => {
  const statisticsGateway = new InMemoryStatisticsGateway()
  await statisticsGateway.trackGuessForHand(hand, false)
  await statisticsGateway.trackGuessForHand(hand, false)
  subject({ statisticsGateway })

  const handEl = await screen.findByTestId(`statistics-overall`)
  expect(handEl.innerHTML).toEqual('0%')
})

it.each(HAND_NAMES)('displays 50% when all guesses overall have been wrong', async hand => {
  const statisticsGateway = new InMemoryStatisticsGateway()
  await statisticsGateway.trackGuessForHand(hand, false)
  await statisticsGateway.trackGuessForHand(hand, true)
  subject({ statisticsGateway })

  const handEl = await screen.findByTestId(`statistics-overall`)
  expect(handEl.innerHTML).toEqual('50%')
})

it.each(HAND_NAMES)('displays nothing when no guesses overall have been made', async hand => {
  const statisticsGateway = new InMemoryStatisticsGateway()
  subject({ statisticsGateway })

  const handEl = await screen.findByTestId(`statistics-overall`)
  expect(handEl.innerHTML).toEqual('')
})

it.each(HAND_NAMES)('displays 100 when all guesses for a hand have been correct', async hand => {
  const statisticsGateway = new InMemoryStatisticsGateway()
  await statisticsGateway.trackGuessForHand(hand, true)
  subject({ statisticsGateway })

  const handEl = await screen.findByTestId(`statistics-hand-${hand}`)
  expect(handEl.innerHTML).toEqual('100')
})

it.each(HAND_NAMES)('displays 0 when all guesses for a hand have been wrong', async hand => {
  const statisticsGateway = new InMemoryStatisticsGateway()
  await statisticsGateway.trackGuessForHand(hand, false)
  subject({ statisticsGateway })

  const handEl = await screen.findByTestId(`statistics-hand-${hand}`)
  expect(handEl.innerHTML).toEqual('0')
})

it.each(HAND_NAMES)('displays 50 when half guesses for a hand have been correct', async hand => {
  const statisticsGateway = new InMemoryStatisticsGateway()
  await statisticsGateway.trackGuessForHand(hand, false)
  await statisticsGateway.trackGuessForHand(hand, true)
  subject({ statisticsGateway })

  const handEl = await screen.findByTestId(`statistics-hand-${hand}`)
  expect(handEl.innerHTML).toEqual('50')
})

it.each(HAND_NAMES)('displays nothing when no guesses for a hand have been made', async hand => {
  const statisticsGateway = new InMemoryStatisticsGateway()
  subject({ statisticsGateway })

  const handEl = await screen.findByTestId(`statistics-hand-${hand}`)
  expect(handEl.innerHTML).toEqual('')
})

const subject = (config: { statisticsGateway?: IStatisticsGateway } = {}) => {
  const dependencies: Partial<IAppDependencies> = {
    statisticsGateway: config.statisticsGateway || new InMemoryStatisticsGateway(),
  }

  render(
    <DependencyProvider value={dependencies}>
      <Statistics />
    </DependencyProvider>
  )
}
