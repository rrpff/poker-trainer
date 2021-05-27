import CardSequence from '../components/CardSequence'
import { useHandExamples } from '../hooks/useHandExamples'
import { formatPokerHandName } from '../lib/formatPokerHandName'
import { HAND_NAMES } from '../types'

export const Hands = () => {
  const hands = useHandExamples()

  return (
    <div>
      {HAND_NAMES.map(handName => (
        <div key={handName} data-testid={`hand-${handName}`}>
          <h2>{formatPokerHandName(handName).name}</h2>
          <p>{formatPokerHandName(handName).description}</p>

          <CardSequence
            cards={hands[handName].cards}
            highlightedCards={hands[handName].handCards}
            highlighttype="exact"
          />
        </div>
      ))}
    </div>
  )
}

export default Hands
