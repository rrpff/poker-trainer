import { royalFlush } from './poker'
import { cardDescriptionToCard, cardsMatch, without } from './utils'

test.each`

  subject          | description         | cards                                         | achieved | remaining
  ${royalFlush}    | ${'royal_flush'}    | ${['AC', 'KC', 'QC', 'JC', 'TC', 'AD', '5D']} | ${true}  | ${['AD', '5D']}
  ${royalFlush}    | ${'royal_flush'}    | ${['AS', 'KS', 'QS', 'JS', 'TS', 'AD', '5D']} | ${true}  | ${['AD', '5D']}
  ${royalFlush}    | ${'royal_flush'}    | ${['AH', 'KH', 'QH', 'JH', 'TH', 'AD', '5D']} | ${true}  | ${['AD', '5D']}
  ${royalFlush}    | ${'royal_flush'}    | ${['AD', 'KD', 'QD', 'JD', 'TD', 'AC', '5D']} | ${true}  | ${['AC', '5D']}
  ${royalFlush}    | ${'royal_flush'}    | ${['KS', 'KD', 'QD', 'JD', 'TD', 'AC', '5D']} | ${false} | ${['KS', 'KD', 'QD', 'JD', 'TD', 'AC', '5D']}
  ${royalFlush}    | ${'royal_flush'}    | ${['AS', 'KD', 'QS', 'JS', 'TS', 'AD', '5D']} | ${false} | ${['AS', 'KD', 'QS', 'JS', 'TS', 'AD', '5D']}
  ${royalFlush}    | ${'royal_flush'}    | ${['AS', 'KS', 'QD', 'JS', 'TS', 'AD', '5D']} | ${false} | ${['AS', 'KS', 'QD', 'JS', 'TS', 'AD', '5D']}
  ${royalFlush}    | ${'royal_flush'}    | ${['AS', 'KS', 'QS', 'JD', 'TS', 'AD', '5D']} | ${false} | ${['AS', 'KS', 'QS', 'JD', 'TS', 'AD', '5D']}
  ${royalFlush}    | ${'royal_flush'}    | ${['AS', 'KS', 'QS', 'JD', 'TS', 'AD', '5D']} | ${false} | ${['AS', 'KS', 'QS', 'JD', 'TS', 'AD', '5D']}
  ${royalFlush}    | ${'royal_flush'}    | ${['AD', '5D', 'AS', 'KS', 'QS', 'JS', 'TD']} | ${false} | ${['AD', '5D', 'AS', 'KS', 'QS', 'JS', 'TD']}

`('$description: $achieved with $cards and $remaining remaining', ({ subject, description, cards, achieved, remaining }) => {
  const givenCards = cards.map(cardDescriptionToCard)
  const expectedRemaining = remaining.map(cardDescriptionToCard)
  const expectedCards = without(givenCards, expectedRemaining, cardsMatch)

  expect(subject(givenCards)).toEqual({
    description,
    achieved,
    cards: expectedCards,
    remaining: expectedRemaining,
  })
})
