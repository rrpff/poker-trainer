import { fireEvent, render, screen } from '@testing-library/react'
import { formatPokerHandName } from '../lib/formatPokerHandName'
import { pick } from '../lib/utils'
import { HAND_NAMES, IPokerHandName } from '../types'
import { Hands } from './Hands'

it('displays each hand with a description', async () => {
  subject()

  const hand = pick([...HAND_NAMES])

  const handEl = await screen.findByTestId(`hand-${hand}`)
  expect(handEl).toContainHTML(formatPokerHandName(hand).name)
  expect(handEl).toContainHTML(formatPokerHandName(hand).description)
})

it('display cards for a hand', async () => {
  subject()

  const hand = pick([...HAND_NAMES])

  const handEl = await screen.findByTestId(`hand-${hand}`)
  const cardEls = handEl.querySelectorAll('[data-testid="card"]')
  expect(cardEls.length).toEqual(7)
})

it('displays cards for each hand', async () => {
  subject()

  const cardEls = await screen.findAllByTestId(`card`)
  expect(cardEls.length).toEqual(HAND_NAMES.length * 7)
})

it('supports regenerating hands', async () => {
  subject()

  const hand = 'high_card'
  const handEl = await screen.findByTestId(`hand-${hand}`)
  const initialCards = await getRenderedCardDescriptions(handEl)

  const regenerateLink = handEl.querySelector('[data-testid="regenerate"]')
  fireEvent.click(regenerateLink!)

  const updatedHandEl = await screen.findByTestId(`hand-${hand}`)
  const updatedCards = await getRenderedCardDescriptions(updatedHandEl)

  expect(updatedCards).not.toEqual(initialCards)
})

const getRenderedCardDescriptions = async (el: HTMLElement) => {
  const cardEls = el.querySelectorAll('[data-testid="card"]')
  return Array.from(cardEls)
    .map(c => `${c.getAttribute('data-test-face')}${c.getAttribute('data-test-suit')}`)
}

const subject = () => {
  render(
    <Hands />
  )
}
