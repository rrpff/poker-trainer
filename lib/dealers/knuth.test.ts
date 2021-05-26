import equal from 'deep-equal'
import { knuthDealer } from './knuth'

it.each([1,2,3])('deals the specified number of cards', num => {
  expect(knuthDealer.deal(num)).toHaveLength(num)
})

it('deals different cards every time', () => {
  const ITERATIONS = 10
  let lastRun = null
  let differentRuns = 0

  for (let i = 0; i < ITERATIONS; i++) {
    const run = knuthDealer.deal(7)

    if (!equal(lastRun, run))
      differentRuns += 1

    lastRun = run
  }

  expect(differentRuns).toBeGreaterThan(1)
})
