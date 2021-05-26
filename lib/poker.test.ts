import { cardDescriptionToCard, cardsMatch, without } from './utils'
import {
  checkRoyalFlush,
  checkStraightFlush,
  checkFourOfAKind,
  checkFullHouse,
  checkFlush,
  checkStraight,
  checkThreeOfAKind,
  checkTwoPair,
  checkPair,
  checkHighCard,
} from './poker'

test.each`

  subject               | description          | cards                                         | achieved | remaining

  ${checkRoyalFlush}    | ${'royal_flush'}     | ${['AC', 'KC', 'QC', 'JC', 'TC', 'AD', '5D']} | ${true}  | ${['AD', '5D']}
  ${checkRoyalFlush}    | ${'royal_flush'}     | ${['AS', 'KS', 'QS', 'JS', 'TS', 'AD', '5D']} | ${true}  | ${['AD', '5D']}
  ${checkRoyalFlush}    | ${'royal_flush'}     | ${['AH', 'KH', 'QH', 'JH', 'TH', 'AD', '5D']} | ${true}  | ${['AD', '5D']}
  ${checkRoyalFlush}    | ${'royal_flush'}     | ${['AD', 'KD', 'QD', 'JD', 'TD', 'AC', '5D']} | ${true}  | ${['AC', '5D']}
  ${checkRoyalFlush}    | ${'royal_flush'}     | ${['KS', 'KD', 'QD', 'JD', 'TD', 'AC', '5D']} | ${false} | ${['KS', 'KD', 'QD', 'JD', 'TD', 'AC', '5D']}
  ${checkRoyalFlush}    | ${'royal_flush'}     | ${['AS', 'KD', 'QS', 'JS', 'TS', 'AD', '5D']} | ${false} | ${['AS', 'KD', 'QS', 'JS', 'TS', 'AD', '5D']}
  ${checkRoyalFlush}    | ${'royal_flush'}     | ${['AS', 'KS', 'QD', 'JS', 'TS', 'AD', '5D']} | ${false} | ${['AS', 'KS', 'QD', 'JS', 'TS', 'AD', '5D']}
  ${checkRoyalFlush}    | ${'royal_flush'}     | ${['AS', 'KS', 'QS', 'JD', 'TS', 'AD', '5D']} | ${false} | ${['AS', 'KS', 'QS', 'JD', 'TS', 'AD', '5D']}
  ${checkRoyalFlush}    | ${'royal_flush'}     | ${['AS', 'KS', 'QS', 'JD', 'TS', 'AD', '5D']} | ${false} | ${['AS', 'KS', 'QS', 'JD', 'TS', 'AD', '5D']}
  ${checkRoyalFlush}    | ${'royal_flush'}     | ${['AD', '5D', 'AS', 'KS', 'QS', 'JS', 'TD']} | ${false} | ${['AD', '5D', 'AS', 'KS', 'QS', 'JS', 'TD']}

  ${checkStraightFlush} | ${'straight_flush'}  | ${['8C', '7C', '6C', '5C', '4C', '2C', '1C']} | ${true}  | ${['2C', '1C']}
  ${checkStraightFlush} | ${'straight_flush'}  | ${['8D', '7D', '6D', '5D', '4D', '2D', '1D']} | ${true}  | ${['2D', '1D']}
  ${checkStraightFlush} | ${'straight_flush'}  | ${['8H', '7H', '6D', '5D', '4D', '2D', '1D']} | ${false} | ${['8H', '7H', '6D', '5D', '4D', '2D', '1D']}
  ${checkStraightFlush} | ${'straight_flush'}  | ${['8S', '7S', '6D', '5D', '4D', '2D', '1D']} | ${false} | ${['8S', '7S', '6D', '5D', '4D', '2D', '1D']}

  ${checkFourOfAKind}   | ${'four_of_a_kind'}  | ${['AC', 'KC', 'KD', 'KH', 'KS', '9D', '4C']} | ${true}  | ${['AC', '9D', '4C']}
  ${checkFourOfAKind}   | ${'four_of_a_kind'}  | ${['AC', '9C', '9D', '9H', '9S', 'KD', '4C']} | ${true}  | ${['AC', 'KD', '4C']}
  ${checkFourOfAKind}   | ${'four_of_a_kind'}  | ${['AC', '9C', '9D', '8H', '9S', 'KD', '4C']} | ${false} | ${['AC', '9C', '9D', '8H', '9S', 'KD', '4C']}

  ${checkFullHouse}     | ${'full_house'}      | ${['AC', 'AD', 'AS', '9C', '9D', '6D', '5D']} | ${true}  | ${['6D', '5D']}
  ${checkFullHouse}     | ${'full_house'}      | ${['AC', 'AD', 'AS', '8C', '8D', '3D', '5D']} | ${true}  | ${['3D', '5D']}
  ${checkFullHouse}     | ${'full_house'}      | ${['AC', '9D', 'AS', '8C', '8D', '3D', '5D']} | ${false} | ${['AC', '9D', 'AS', '8C', '8D', '3D', '5D']}

  ${checkFlush}         | ${'flush'}           | ${['4C', '2C', '8C', 'KC', 'AC', '2D', '8D']} | ${true}  | ${['2D', '8D']}
  ${checkFlush}         | ${'flush'}           | ${['9S', '2S', '8S', 'KS', 'AS', 'KC', 'AC']} | ${true}  | ${['KC', 'AC']}
  ${checkFlush}         | ${'flush'}           | ${['9S', '2S', '8C', 'KS', 'AS', 'KC', 'AC']} | ${false} | ${['9S', '2S', '8C', 'KS', 'AS', 'KC', 'AC']}

  ${checkStraight}      | ${'straight'}        | ${['9C', '8D', '7S', '6D', '5H', 'KC', 'AC']} | ${true}  | ${['KC', 'AC']}
  ${checkStraight}      | ${'straight'}        | ${['KC', 'QD', 'JC', 'TD', '9H', '2S', '8D']} | ${true}  | ${['2S', '8D']}
  ${checkStraight}      | ${'straight'}        | ${['KC', 'QD', 'JC', 'TD', '9H', 'AS', '8D']} | ${true}  | ${['9H', '8D']}
  ${checkStraight}      | ${'straight'}        | ${['KC', 'QD', 'TC', 'TD', '9H', '2S', '8D']} | ${false} | ${['KC', 'QD', 'TC', 'TD', '9H', '2S', '8D']}

  ${checkThreeOfAKind}  | ${'three_of_a_kind'} | ${['7S', '7D', '7C', '8D', '9D', 'TD', 'JD']} | ${true}  | ${['8D', '9D', 'TD', 'JD']}
  ${checkThreeOfAKind}  | ${'three_of_a_kind'} | ${['4S', '4D', '4C', '8C', '9C', 'TC', 'JC']} | ${true}  | ${['8C', '9C', 'TC', 'JC']}
  ${checkThreeOfAKind}  | ${'three_of_a_kind'} | ${['4S', '3D', '4C', '8C', '9C', 'TC', 'JC']} | ${false} | ${['4S', '3D', '4C', '8C', '9C', 'TC', 'JC']}
  ${checkThreeOfAKind}  | ${'three_of_a_kind'} | ${['4S', '4D', '4C', '5S', '5D', '5C', 'JC']} | ${true}  | ${['4S', '4D', '4C', 'JC']}
  ${checkThreeOfAKind}  | ${'three_of_a_kind'} | ${['5S', '5D', '5C', '4S', '4D', '4C', 'JC']} | ${true}  | ${['4S', '4D', '4C', 'JC']}

  ${checkTwoPair}       | ${'two_pair'}        | ${['AS', 'KS', 'KD', 'AC', '5D', '4C', 'JC']} | ${true}  | ${['5D', '4C', 'JC']}
  ${checkTwoPair}       | ${'two_pair'}        | ${['QS', 'JS', 'JD', 'QC', '5D', '5C', 'JC']} | ${true}  | ${['5D', '5C', 'JC']}
  ${checkTwoPair}       | ${'two_pair'}        | ${['QS', 'AS', 'JD', 'QC', '5D', '2C', 'TC']} | ${false} | ${['QS', 'AS', 'JD', 'QC', '5D', '2C', 'TC']}

  ${checkPair}          | ${'pair'}            | ${['5S', '5D', '3C', '2S', '4D', '9C', 'JC']} | ${true}  | ${['3C', '2S', '4D', '9C', 'JC']}
  ${checkPair}          | ${'pair'}            | ${['5S', '5D', '3C', '8S', '8D', '4C', 'JC']} | ${true}  | ${['5S', '5D', '3C', '4C', 'JC']}
  ${checkPair}          | ${'pair'}            | ${['5S', '6D', '3C', 'TS', '8D', '4C', 'JC']} | ${false} | ${['5S', '6D', '3C', 'TS', '8D', '4C', 'JC']}

  ${checkHighCard}      | ${'high_card'}       | ${['5S', '6D', '3C', 'TS', '8D', '4C', 'JC']} | ${true}  | ${['5S', '6D', '3C', 'TS', '8D', '4C']}
  ${checkHighCard}      | ${'high_card'}       | ${['5S', '6D', '3C', 'TS', '8D', '4C', 'KC']} | ${true}  | ${['5S', '6D', '3C', 'TS', '8D', '4C']}
  ${checkHighCard}      | ${'high_card'}       | ${['5S', '6D', '3C', 'TS', '8D', '4C', '2C']} | ${true}  | ${['5S', '6D', '3C', '8D', '4C', '2C']}

`('$description: $achieved with $cards and $remaining remaining', ({ subject, description, cards, achieved, remaining }) => {
  const givenCards = cards.map(cardDescriptionToCard)
  const expectedRemaining = remaining.map(cardDescriptionToCard)
  const expectedCards = without(givenCards, expectedRemaining, cardsMatch)

  expect(subject(givenCards)).toEqual({
    description,
    achieved,
    cards: expect.arrayContaining(expectedCards),
    remaining: expect.arrayContaining(expectedRemaining),
  })
})
