import { cardDescriptionToCard, cardToDescription, createDeck } from './utils'

describe('createDeck', () => {
  it('returns a full deck', () => {
    expect(createDeck()).toHaveLength(52)
    expect(createDeck()).toMatchSnapshot()
  })
})

describe('cardToDescription', () => {
  it('translates a card into a string description', () => {
    expect(createDeck().map(cardToDescription)).toMatchSnapshot()
  })
})

describe('cardDescriptionToCard', () => {
  it('translates a card description into a card object', () => {
    const descriptions = createDeck().map(cardToDescription)
    expect(descriptions.map(cardDescriptionToCard)).toEqual(createDeck())
  })
})
