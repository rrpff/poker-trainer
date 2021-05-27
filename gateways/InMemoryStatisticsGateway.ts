import { HAND_NAMES, IHistoricalHandGuess, IHistoricalHandGuesses, IPokerHandName, IStatisticsGateway } from '../types'

export class InMemoryStatisticsGateway implements IStatisticsGateway {
  private guesses: IHistoricalHandGuess<any>[] = []

  public async getHistoricalHandGuesses(): Promise<IHistoricalHandGuesses> {
    const base = {} as IHistoricalHandGuesses
    return HAND_NAMES.reduce((guesses, hand) => ({
      ...guesses,
      [hand]: this.guesses.filter(stat => stat.hand === hand),
    }), base)
  }

  public async trackGuessForHand(hand: IPokerHandName, wasCorrect: boolean): Promise<void> {
    this.guesses.push({
      hand,
      timestamp: Date.now(),
      wasCorrect,
    })
  }
}
