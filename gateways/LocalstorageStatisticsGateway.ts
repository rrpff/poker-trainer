import { HAND_NAMES, IHistoricalHandGuess, IHistoricalHandGuesses, IPokerHandName, IStatisticsGateway } from '../types'

export const LOCALSTORAGE_STATISTICS_KEY = 'poker-statistics'

export class LocalstorageStatisticsGateway implements IStatisticsGateway {
  private guesses: IHistoricalHandGuess<any>[] = []

  public async getHistoricalHandGuesses(): Promise<IHistoricalHandGuesses> {
    this.load()

    const base = {} as IHistoricalHandGuesses
    return HAND_NAMES.reduce((guesses, hand) => ({
      ...guesses,
      [hand]: this.guesses.filter(stat => stat.hand === hand),
    }), base)
  }

  public async trackGuessForHand(hand: IPokerHandName, wasCorrect: boolean): Promise<void> {
    this.load()

    this.guesses.push({
      hand,
      timestamp: Date.now(),
      wasCorrect,
    })

    this.persist()
  }

  private load() {
    const persisted = window.localStorage.getItem(LOCALSTORAGE_STATISTICS_KEY)
    const statistics = persisted ? JSON.parse(persisted) : []

    this.guesses = statistics
  }

  private persist() {
    window.localStorage.setItem(LOCALSTORAGE_STATISTICS_KEY, JSON.stringify(this.guesses))
  }
}
