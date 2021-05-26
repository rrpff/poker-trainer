import { knuthShuffle } from 'knuth-shuffle'
import { createDeck } from '../utils'
import { IDealer } from '../../types'

export const knuthDealer: IDealer = {
  deal: (num: number) => {
    return knuthShuffle(createDeck()).slice(0, num)
  }
}
