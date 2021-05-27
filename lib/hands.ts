import Pokersolver from 'pokersolver'
import { FACES, ICard, ICardFace, IHandChecker, IHandCheckResult, IPokerHandName } from '../types'
import { cardsMatch, without } from './utils'

export const checkHand = (hand: IPokerHandName, cards: ICard[]): IHandCheckResult => {
  switch (hand) {
    case 'royal_flush': return checkRoyalFlush(cards)
    case 'straight_flush': return checkStraightFlush(cards)
    case 'four_of_a_kind': return checkFourOfAKind(cards)
    case 'full_house': return checkFullHouse(cards)
    case 'flush': return checkFlush(cards)
    case 'straight': return checkStraight(cards)
    case 'three_of_a_kind': return checkThreeOfAKind(cards)
    case 'two_pair': return checkTwoPair(cards)
    case 'pair': return checkPair(cards)
    case 'high_card': return checkHighCard(cards)
    default: throw new Error('Invalid hand name')
  }
}

export const checkRoyalFlush: IHandChecker = (cards: ICard[]) =>
  checkWithPokersolver(Pokersolver.RoyalFlush, cards, 'royal_flush')

export const checkStraightFlush: IHandChecker = (cards: ICard[]) =>
  checkWithPokersolver(Pokersolver.StraightFlush, cards, 'straight_flush')

export const checkFourOfAKind: IHandChecker = (cards: ICard[]) =>
  checkWithPokersolver(Pokersolver.FourOfAKind, cards, 'four_of_a_kind')

export const checkFullHouse: IHandChecker = (cards: ICard[]) =>
  checkWithPokersolver(Pokersolver.FullHouse, cards, 'full_house')

export const checkFlush: IHandChecker = (cards: ICard[]) =>
  checkWithPokersolver(Pokersolver.Flush, cards, 'flush')

export const checkStraight: IHandChecker = (cards: ICard[]) =>
  checkWithPokersolver(Pokersolver.Straight, cards, 'straight')

export const checkThreeOfAKind: IHandChecker = (cards: ICard[]) =>
  checkWithPokersolver(Pokersolver.ThreeOfAKind, cards, 'three_of_a_kind')

export const checkTwoPair: IHandChecker = (cards: ICard[]) => {
  const firstPair = checkPair(cards)
  if (!firstPair.achieved) return { achieved: false, description: 'two_pair', cards: [], remaining: cards }

  const secondPair = checkPair(firstPair.remaining)
  if (!secondPair.achieved) return { achieved: false, description: 'two_pair', cards: [], remaining: cards }

  const used = [...firstPair.cards, ...secondPair.cards]

  return {
    achieved: true,
    description: 'two_pair',
    cards: used,
    remaining: without(cards, used, cardsMatch),
  }
}

export const checkPair: IHandChecker = (cards: ICard[]) => {
  const facesSorted = [...FACES].reverse()
  const pair = facesSorted.reduce((found: ICard[] | null, face) => {
    if (found) return found

    const cardsWithFace = cards.filter(card => card.face === face)
    if (cardsWithFace.length < 2) return null

    return cardsWithFace.slice(0, 2)
  }, null)

  return {
    achieved: pair !== null,
    description: 'pair',
    cards: pair || [],
    remaining: without(cards, pair || [], cardsMatch),
  }
}

export const checkHighCard: IHandChecker = (cards: ICard[]) => {
  const facesSorted = [...FACES].reverse()
  const highFace = facesSorted.find(face => cards.some(card => card.face === face))
  const highCard = cards.find(card => card.face === highFace)!

  return {
    achieved: true,
    description: 'high_card',
    cards: [highCard],
    remaining: without(cards, [highCard], cardsMatch),
  }
}

const checkWithPokersolver = (solverClass: any, cards: ICard[], handName: IPokerHandName): IHandCheckResult => {
  const pokersolverCards = cards.map(cardToPokersolverCard)
  const result = new solverClass(pokersolverCards, new Pokersolver.Game('standard'), false)

  const achieved = result.isPossible
  let resultCards: any[]

  switch (handName) {
    // `pokersolver` includes the high card in the returned hand
    // when solving three/two of a kind hands.
    //
    // this isn't useful when checking which cards contributed to
    // a successful four of a kind, so remove it.
    case 'three_of_a_kind': {
      resultCards = result.values.find((v: any) => v && v.length === 3) || []
      break
    }
    case 'four_of_a_kind': {
      resultCards = result.values.find((v: any) => v && v.length === 4) || []
      break
    }
    default: {
      resultCards = result.cards
    }
  }

  const used = achieved
    ? resultCards.map(pokersolverCardToCard)
    : []

  return {
    achieved: achieved,
    description: handName,
    cards: used,
    remaining: without(cards, used, cardsMatch),
  }
}

const cardToPokersolverCard = (card: ICard): string => {
  const face = card.face
  const suit = card.suit === 'clubs' ? 'c' :
    card.suit === 'diamonds' ? 'd' :
    card.suit === 'hearts' ? 'h' :
    card.suit === 'spades' ? 's' :
    null

  return `${face}${suit}`
}

const pokersolverCardToCard = (pokersolverCard: { value: string, suit: string }): ICard => {
  const face = pokersolverCard.value as ICardFace
  switch (pokersolverCard.suit) {
    case 'c': return { face, suit: 'clubs' }
    case 'd': return { face, suit: 'diamonds' }
    case 's': return { face, suit: 'spades' }
    case 'h': return { face, suit: 'hearts' }
    default: throw new Error(`Invalid suit: ${pokersolverCard.suit}`)
  }
}
