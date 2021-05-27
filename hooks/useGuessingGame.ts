import { useEffect, useState } from 'react'
import { checkGuess } from '../lib/checkGuess'
import { formatPokerHandName } from '../lib/formatPokerHandName'
import { parseGuess } from '../lib/parseGuess'
import { ICard, IDealer, IGuessingGameState, IHandGuessResult, IUseGuessingGameHook } from '../types'

export const useGuessingGame: IUseGuessingGameHook = (dealer: IDealer) => {
  const [cards, setCards] = useState<ICard[]>([])
  const [state, setState] = useState<IGuessingGameState>('ready')
  const [results, setResults] = useState<IHandGuessResult | null>(null)
  const [actualBestHand, setActualBestHand] = useState<{ name: string, description: string } | null>(null)

  useEffect(() => {
    setCards(dealer.deal(7))
  }, [])

  const guess = (text: string) => {
    const guessedHandName = parseGuess(text)
    const results = checkGuess(guessedHandName, cards)

    setState('summary')
    setResults(results)
    setActualBestHand(formatPokerHandName(results.bestName))
  }

  const proceed = () => {
    setCards(dealer.deal(7))
    setState('ready')
    setResults(null)
    setActualBestHand(null)
  }

  return {
    state,
    cards,
    accuracy: results?.accuracy,
    correctHandName: actualBestHand?.name,
    correctHandDescription: actualBestHand?.description,
    relevantCards: results?.bestCards,
    guess,
    proceed,
  }
}
