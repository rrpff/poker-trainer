import { FormEvent, useEffect, useRef, useState } from 'react'
import { useDependency } from 'react-use-dependency'
import { useGuessingGame } from '../hooks/useGuessingGame'
import { Button } from '../components/Button'
import { CardSequence } from '../components/CardSequence'
import { Choice } from '../components/Choice'
import { Column, Row } from '../components/Grid'
import { HeroInput } from '../components/HeroInput'
import { IDealer } from '../types'
import { PageContent } from '../components/PageContent'

export const GuessingGame = () => {
  const dealer = useDependency<IDealer>('dealer')
  const game = useGuessingGame({ dealer: dealer! })
  const [guessText, setGuessText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const submitGuess = (text: string) => {
    if (game.state === 'summary') return
    game.guess(text)
  }

  const handleGuess = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submitGuess(guessText)
  }

  const handleNext = () => {
    setGuessText('')
    game.proceed()
  }

  useEffect(() => {
    if (game.state === 'summary') buttonRef.current?.focus()
    else inputRef.current?.focus()
  }, [inputRef, game])

  return (
    <div>
      <CardSequence
        highlighttype={game.accuracy || 'exact'}
        highlightedCards={game.relevantCards || []}
        cards={game.cards}
      />

      <PageContent style={{ paddingTop: '30px', paddingBottom: '60px' }}>
        <h3>What is the winning hand?</h3>

        <form onSubmit={handleGuess} style={{ marginBottom: 20 }} data-testid="guess-form">
          <HeroInput
            as="input"
            type="text"
            ref={inputRef}
            value={guessText}
            disabled={game.state === 'summary'}
            onChange={e => setGuessText(e.target.value)}
            placeholder="e.g. pair, full house..."
            data-testid="guess-input"
          />
        </form>

        {game.state === 'ready' && (
          <Row>
            <Column style={{ textAlign: 'right', paddingRight: 20 }}>
              <Choice data-testid="guess-royal_flush" href="#!" onClick={() => submitGuess('royal_flush')}>royal flush</Choice>
              <Choice data-testid="guess-straight_flush" href="#!" onClick={() => submitGuess('straight_flush')}>straight flush</Choice>
              <Choice data-testid="guess-four_of_a_kind" href="#!" onClick={() => submitGuess('four_of_a_kind')}>four of a kind</Choice>
              <Choice data-testid="guess-full_house" href="#!" onClick={() => submitGuess('full_house')}>full house</Choice>
              <Choice data-testid="guess-flush" href="#!" onClick={() => submitGuess('flush')}>flush</Choice>
            </Column>
            <Column style={{ textAlign: 'left', paddingLeft: 20 }}>
              <Choice data-testid="guess-straight" href="#!" onClick={() => submitGuess('straight')}>straight</Choice>
              <Choice data-testid="guess-three_of_a_kind" href="#!" onClick={() => submitGuess('three_of_a_kind')}>three of a kind</Choice>
              <Choice data-testid="guess-two_pair" href="#!" onClick={() => submitGuess('two_pair')}>two pair</Choice>
              <Choice data-testid="guess-pair" href="#!" onClick={() => submitGuess('pair')}>pair</Choice>
              <Choice data-testid="guess-high_card" href="#!" onClick={() => submitGuess('high_card')}>high card</Choice>
            </Column>
          </Row>
        )}

        {game.state === 'summary' && (
          <div data-testid="summary">
            <h3>{game.accuracy === 'wrong' ? 'Nope.' : game.accuracy === 'close' ? 'Close.' : 'Correct!'}</h3>
            <strong
              style={{
                color: game.accuracy === 'exact' ? '#1dd1a1' :
                  game.accuracy === 'close' ? '#feca57' :
                  '#ff6b6b'
              }}
            >
              It was a {game.correctHandName}
            </strong>
            <p>{game.correctHandDescription}</p>
            <Button data-testid="proceed" ref={buttonRef} style={{ padding: 20 }} onClick={() => handleNext()}>Next &rarr;</Button>
          </div>
        )}
      </PageContent>
    </div>
  )
}
