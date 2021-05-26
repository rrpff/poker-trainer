import Head from 'next/head'
import { cardToDescription, createDeck } from '../lib/utils'

const IMAGES = createDeck()
  .map(cardToDescription)
  .map(description => `/cards/${description}.svg`)

export const PreloadCardImages = () => {
  return (
    <Head>
      {IMAGES.map(src =>
        <link rel="preload" as="image" href={src}></link>
      )}
    </Head>
  )
}

export default PreloadCardImages
