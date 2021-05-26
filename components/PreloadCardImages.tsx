import Head from 'next/head'
import { useIsDocumentLoaded } from '../hooks/useIsDocumentLoaded'
import { cardToDescription, createDeck } from '../lib/utils'

const IMAGES = createDeck()
  .map(cardToDescription)
  .map(description => `/cards/${description}.svg`)

export const PreloadCardImages = () => {
  const startPreload = useIsDocumentLoaded()

  if (!startPreload) return null

  return (
    <Head>
      {IMAGES.map(src =>
        <link key={src} rel="preload" as="image" href={src}></link>
      )}
    </Head>
  )
}

export default PreloadCardImages
