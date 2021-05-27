import { renderHook, act } from '@testing-library/react-hooks'
import { InMemoryStatisticsGateway } from '../gateways/InMemoryStatisticsGateway'
import { checkGuess } from '../lib/checkGuess'
import { knuthDealer } from '../lib/dealers/knuth'
import { formatPokerHandName } from '../lib/formatPokerHandName'
import { cardDescriptionToCard, createDeck, pick } from '../lib/utils'
import { HAND_NAMES, IDealer, IUseGuessingGameHookInput } from '../types'
import { useGuessingGame } from './useGuessingGame'

it('should start with a set of seven cards', () => {
  const { result } = renderHook(() => subject())

  expect(result.current.cards).toHaveLength(7)
  expect(createDeck()).toEqual(expect.arrayContaining(result.current.cards))
})

it('should start with a "ready" state', () => {
  const { result } = renderHook(() => subject())

  expect(result.current.state).toEqual('ready')
})

it('should deal the cards using the given dealer', () => {
  const cards = knuthDealer.deal(7)
  const { result } = renderHook(() => subject({ dealer: { deal: () => cards } }))

  expect(result.current.cards).toEqual(cards)
})

it('should include results after a guess', () => {
  const cards = knuthDealer.deal(7)
  const { result } = renderHook(() => subject({ dealer: { deal: () => cards } }))

  const guess = pick([...HAND_NAMES])
  const expected = checkGuess(guess, cards)
  const formatted = formatPokerHandName(expected.bestName)

  act(() => result.current.guess(guess))

  expect(result.current.accuracy).toEqual(expected.accuracy)
  expect(result.current.correctHandName).toEqual(formatted.name)
  expect(result.current.correctHandDescription).toEqual(formatted.description)
  expect(result.current.relevantCards).toEqual(expected.bestCards)
})

it('should have a "summary" state after guessing', () => {
  const { result } = renderHook(() => subject())

  const guess = pick([...HAND_NAMES])
  act(() => result.current.guess(guess))

  expect(result.current.state).toEqual('summary')
})

it('should return to its default state after proceeding', () => {
  const { result } = renderHook(() => subject())

  const guess = pick([...HAND_NAMES])
  act(() => result.current.guess(guess))
  act(() => result.current.proceed())

  expect(result.current.state).toEqual('ready')
  expect(result.current.accuracy).toEqual(undefined)
  expect(result.current.correctHandName).toEqual(undefined)
  expect(result.current.correctHandDescription).toEqual(undefined)
  expect(result.current.relevantCards).toEqual(undefined)
})

it('should deal new cards after proceeding', () => {
  const firstDeal = knuthDealer.deal(7)
  const secondDeal = knuthDealer.deal(7)
  const stubDealer = {
    deal: jest.fn()
      .mockReturnValueOnce(firstDeal)
      .mockReturnValueOnce(secondDeal)
  }

  const { result } = renderHook(() => subject({ dealer: stubDealer }))

  act(() => result.current.guess('high_card'))
  act(() => result.current.proceed())

  expect(result.current.cards).toEqual(secondDeal)
  expect(firstDeal).not.toEqual(secondDeal)
})

describe('if given a statistics gateway', () => {
  it.each([
    { guess: 'royal flush', expectedWasCorrect: true },
    { guess: 'flush', expectedWasCorrect: false },
    { guess: 'pair', expectedWasCorrect: false },
  ])('should record guesses', async ({ guess, expectedWasCorrect }) => {
    const dealer = royalFlushDealer
    const statistics = new InMemoryStatisticsGateway()
    const { result } = renderHook(() => subject({ dealer, statistics }))

    act(() => result.current.guess(guess))

    expect((await statistics.getHistoricalHandGuesses())).toEqual([
      expect.objectContaining({
        hand: 'royal_flush',
        wasCorrect: expectedWasCorrect,
      })
    ])
  })
})

const royalFlushDealer: IDealer = {
  deal: () => ['AC', 'KC', 'QC', 'JC', 'TC', 'AD', '5D'].map(cardDescriptionToCard),
}

const subject = (input: Partial<IUseGuessingGameHookInput> = {}) => {
  return useGuessingGame({
    dealer: input.dealer || knuthDealer,
    statistics: input.statistics,
  })
}
