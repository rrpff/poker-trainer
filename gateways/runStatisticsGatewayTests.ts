import { HAND_NAMES, IStatisticsGateway } from '../types'

export const runStatisticsGatewayTests = (createGateway: () => IStatisticsGateway) => {
  it('should return none when there are no historical hand guesses', async () => {
    const gateway = createGateway()

    expect(await gateway.getHistoricalHandGuesses()).toEqual([])
  })

  it.each(HAND_NAMES)('should include results when there are historical guesses', async hand => {
    const timestamp = Math.random()
    jest.spyOn(Date, 'now').mockReturnValue(timestamp)

    const gateway = createGateway()

    await gateway.trackGuessForHand(hand, true)

    const guesses = await gateway.getHistoricalHandGuesses()

    expect(guesses).toEqual([
      { hand, timestamp, wasCorrect: true }
    ])
  })

  it.each(HAND_NAMES)('should remember when guesses were incorrect', async hand => {
    const timestamp = Math.random()
    jest.spyOn(Date, 'now').mockReturnValue(timestamp)

    const gateway = createGateway()

    await gateway.trackGuessForHand(hand, false)

    const guesses = await gateway.getHistoricalHandGuesses()

    expect(guesses).toEqual([
      { hand, timestamp, wasCorrect: false }
    ])
  })

  it.each(HAND_NAMES)('should remember more than one guess for a hand', async hand => {
    const timestamp = Math.random()
    jest.spyOn(Date, 'now').mockReturnValue(timestamp)

    const gateway = createGateway()

    await gateway.trackGuessForHand(hand, true)
    await gateway.trackGuessForHand(hand, false)
    await gateway.trackGuessForHand(hand, true)

    const guesses = await gateway.getHistoricalHandGuesses()

    expect(guesses).toEqual([
      { hand, timestamp, wasCorrect: true },
      { hand, timestamp, wasCorrect: false },
      { hand, timestamp, wasCorrect: true },
    ])
  })

  it.each(HAND_NAMES)('should remember the time each statistic was recorded', async hand => {
    const timestamp1 = Math.random()
    const timestamp2 = Math.random()

    jest.spyOn(Date, 'now')
      .mockReturnValueOnce(timestamp1)
      .mockReturnValueOnce(timestamp2)

    const gateway = createGateway()

    await gateway.trackGuessForHand(hand, true)
    await gateway.trackGuessForHand(hand, false)

    const guesses = await gateway.getHistoricalHandGuesses()

    expect(guesses).toEqual([
      { hand, timestamp: timestamp1, wasCorrect: true },
      { hand, timestamp: timestamp2, wasCorrect: false },
    ])
  })

  it.each(HAND_NAMES)('should remember the time each statistic was recorded', async hand => {
    const timestamp1 = Math.random()
    const timestamp2 = Math.random()

    jest.spyOn(Date, 'now')
      .mockReturnValueOnce(timestamp1)
      .mockReturnValueOnce(timestamp2)

    const gateway = createGateway()

    await gateway.trackGuessForHand(hand, true)
    await gateway.trackGuessForHand(hand, false)

    const guesses = await gateway.getHistoricalHandGuesses()

    expect(guesses).toEqual([
      { hand, timestamp: timestamp1, wasCorrect: true },
      { hand, timestamp: timestamp2, wasCorrect: false },
    ])
  })

  it.each(HAND_NAMES)('should remember guesses for different hands', async hand => {
    const gateway = createGateway()

    await gateway.trackGuessForHand('royal_flush', true)
    await gateway.trackGuessForHand('high_card', true)
    await gateway.trackGuessForHand('high_card', true)

    const guesses = await gateway.getHistoricalHandGuesses()

    expect(guesses).toHaveLength(3)
  })
}
