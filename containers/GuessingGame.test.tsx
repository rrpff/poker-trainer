import { DependencyProvider } from 'react-use-dependency'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { HAND_NAMES, ICard, IDealer, IPokerHandName } from '../types'
import { knuthDealer } from '../lib/dealers/knuth'
import { cardDescriptionToCard, pick } from '../lib/utils'
import { checkGuess } from '../lib/checkGuess'
import { formatPokerHandName } from '../lib/formatPokerHandName'
import { GuessingGame } from './GuessingGame'

beforeEach(() => jest.useFakeTimers())
afterEach(() => jest.resetAllMocks())

it('renders seven cards immediately', async () => {
  subject()

  const elems = await findCardElements()
  expect(elems.length).toEqual(7)
})

it('renders the dealt cards', async () => {
  const cards = dealRandomCards()
  subject({ dealer: { deal: () => cards } })

  await expectScreenToContainCards(cards)
})

it('displays a summary when guessing', async () => {
  const cards = dealRandomCards()
  subject({ dealer: { deal: () => cards } })

  const guess = pick([...HAND_NAMES])
  const expectedResult = checkGuess(guess, cards)
  const expectedHand = formatPokerHandName(expectedResult.bestName)

  await submitGuess(guess)

  const summary = await findSummaryElement()
  expect(summary).toContainHTML(`It was a ${expectedHand.name}`)
  expect(summary).toContainHTML(expectedHand.description)
})

it('displays a message when the guess is correct', async () => {
  subject({ dealer: { deal: dealCardsWithRoyalFlush } })

  await submitGuess('royal flush')

  const summary = await findSummaryElement()
  expect(summary).toContainHTML(`Correct!`)
  expect(summary).not.toContainHTML(`Close.`)
  expect(summary).not.toContainHTML(`Nope.`)
})

it('displays a message when the guess is close', async () => {
  subject({ dealer: { deal: dealCardsWithRoyalFlush } })

  await submitGuess('flush')

  const summary = await findSummaryElement()
  expect(summary).toContainHTML(`Close.`)
  expect(summary).not.toContainHTML(`Correct!`)
  expect(summary).not.toContainHTML(`Nope.`)
})

it('displays a message when the guess is wrong', async () => {
  subject({ dealer: { deal: dealCardsWithRoyalFlush } })

  await submitGuess('high card')

  const summary = await findSummaryElement()
  expect(summary).toContainHTML(`Nope.`)
  expect(summary).not.toContainHTML(`Correct!`)
  expect(summary).not.toContainHTML(`Close.`)
})

it('supports guessing by clicking a link', async () => {
  const cards = dealRandomCards()
  subject({ dealer: { deal: () => cards } })

  const guess = pick([...HAND_NAMES])
  const expectedResult = checkGuess(guess, cards)
  const expectedHand = formatPokerHandName(expectedResult.bestName)

  const link = await findGuessLink(guess)
  fireEvent.click(link)

  const summary = await findSummaryElement()
  expect(summary).toContainHTML(`It was a ${expectedHand.name}`)
  expect(summary).toContainHTML(expectedHand.description)
})

it('goes to the next round when clicking next', async () => {
  const firstSet = dealRandomCards()
  const secondSet = dealRandomCards()
  const deal = jest.fn()
    .mockReturnValueOnce(firstSet)
    .mockReturnValueOnce(secondSet)

  subject({ dealer: { deal } })

  await expectScreenToContainCards(firstSet)

  await submitGuess('high card')
  await clickProceed()
  await skipCardAnimations()

  await expectScreenToContainCards(secondSet)
})

const dealRandomCards = () => knuthDealer.deal(7)
const dealCardsWithRoyalFlush = () => ['AC', 'KC', 'QC', 'JC', 'TC', 'AD', '5D'].map(cardDescriptionToCard)

const findGuessLink = (hand: IPokerHandName) => screen.findByTestId(`guess-${hand}`)
const findSummaryElement = () => screen.findByTestId('summary')
const findCardElements = () => screen.findAllByTestId('card')
const findProceedButton = () => screen.findByTestId('proceed')

const skipCardAnimations = async () => {
  act(() => { jest.runAllTimers() })
}

const submitGuess = async (guess: string) => {
  const input = await screen.findByTestId('guess-input')
  const form = await screen.findByTestId('guess-form')
  fireEvent.change(input, { target: { value: guess } })
  fireEvent.submit(form)
}

const clickProceed = async () => {
  const button = await findProceedButton()
  fireEvent.click(button)
}

const expectScreenToContainCards = async (cards: ICard[]) => {
  const elems = await findCardElements()

  for (let card of cards) {
    const elem = elems.find(el =>
      card.suit === el.getAttribute('data-test-suit') &&
      card.face === el.getAttribute('data-test-face')
    )

    expect(elem).not.toBeUndefined()
  }
}

const subject = (config: { dealer?: IDealer } = {}) => {
  const dependencies = {
    dealer: config.dealer || knuthDealer
  }

  render(
    <DependencyProvider value={dependencies}>
      <GuessingGame />
    </DependencyProvider>
  )
}
