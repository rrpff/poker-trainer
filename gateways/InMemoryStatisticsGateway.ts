import { IHistoricalHandGuess, IPokerHandName, IStatisticsGateway } from '../types'

export class InMemoryStatisticsGateway implements IStatisticsGateway {
  private guesses: IHistoricalHandGuess<any>[] = []

  public async getHistoricalHandGuesses(): Promise<IHistoricalHandGuess<any>[]> {
    return this.guesses
  }

  public async trackGuessForHand(hand: IPokerHandName, wasCorrect: boolean): Promise<void> {
    this.guesses.push({
      hand,
      timestamp: Date.now(),
      wasCorrect,
    })
  }
}
