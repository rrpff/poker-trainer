import { Story, Meta } from '@storybook/react'
import { createDeck } from '../lib/utils'
import { CardSequence, ICardSequenceProps } from './CardSequence'

const CARDS = createDeck()

export default {
  title: 'CardSequence',
  component: CardSequence,
} as Meta

const Template: Story<ICardSequenceProps> = (args) => <CardSequence {...args} />

export const WithSevenCards = Template.bind({})
WithSevenCards.args = {
  cards: CARDS.slice(0, 7),
  highlightedCards: [],
  highlightType: 'exact',
}

export const WithRandomlyHighlightedCards = Template.bind({})
WithRandomlyHighlightedCards.args = {
  cards: CARDS.slice(0, 7),
  highlightedCards: CARDS.slice(0, 7).filter(() => Math.random() > 0.5),
  highlightType: 'exact',
}

export const WithNoCards = Template.bind({})
WithNoCards.args = {
  cards: [],
  highlightedCards: [],
  highlightType: 'exact',
}
