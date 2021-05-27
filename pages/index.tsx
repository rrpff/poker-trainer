import Head from 'next/head'
import dynamic from 'next/dynamic'
import { GuessingGame } from '../containers/GuessingGame'
import { withDependencies } from '../lib/withDependencies'
import { knuthDealer } from '../lib/dealers/knuth'
import { LocalstorageStatisticsGateway } from '../gateways/LocalstorageStatisticsGateway'

const PreloadCardImages = dynamic(() => import('../components/PreloadCardImages'), { ssr: false })

export const HomePage = () => {
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

export default withDependencies(HomePage, {
  dealer: knuthDealer,
  statisticsGateway: new LocalstorageStatisticsGateway(),
})
