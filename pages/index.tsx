import Head from 'next/head'
import dynamic from 'next/dynamic'
import { GuessingGame } from '../containers/GuessingGame'

const PreloadCardImages = dynamic(() => import('../components/PreloadCardImages'), { ssr: false })

export default function Home() {
  return (
    <main>
      <Head>
        <title>Poker Trainer</title>
      </Head>
      <PreloadCardImages />

      <GuessingGame />
    </main>
  )
}
