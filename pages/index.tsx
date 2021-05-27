import Head from 'next/head'
import dynamic from 'next/dynamic'
import { GuessingGame } from '../containers/GuessingGame'
import { Layout } from '../containers/Layout'
import { withDependencies } from '../lib/withDependencies'
import { knuthDealer } from '../lib/dealers/knuth'
import { LocalstorageStatisticsGateway } from '../gateways/LocalstorageStatisticsGateway'

const PreloadCardImages = dynamic(() => import('../components/PreloadCardImages'), { ssr: false })

export const HomePage = () => {
  return (
    <Layout background="#fff" navigationColor="light" navigationBackground="#01a3a4">
      <Head>
        <title>Poker Trainer</title>
      </Head>
      <PreloadCardImages />

      <GuessingGame />
    </Layout>
  )
}

export default withDependencies(HomePage, {
  dealer: knuthDealer,
  statisticsGateway: new LocalstorageStatisticsGateway(),
})
