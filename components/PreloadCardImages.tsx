import Head from 'next/head'
import { useEffect, useState } from 'react'
import { cardToDescription, createDeck } from '../lib/utils'

const IMAGES = createDeck()
  .map(cardToDescription)
  .map(description => `/cards/${description}.svg`)

export const PreloadCardImages = () => {
  const startPreload = useDelay(1500)

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

const useDelay = (ms: number) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setReady(() => true)
    }, ms)
  }, [])

  return ready
}
