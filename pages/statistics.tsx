import Head from 'next/head'
import { PageContent } from '../components/PageContent'
import { Statistics } from '../containers/Statistics'
import { LocalstorageStatisticsGateway } from '../gateways/LocalstorageStatisticsGateway'
import { withDependencies } from '../lib/withDependencies'

export const StatisticsPage = () => {
  return (
    <main>
      <Head>
        <title>Statistics - Poker Trainer</title>
      </Head>

      <PageContent>
        <Statistics />
      </PageContent>
    </main>
  )
}

export default withDependencies(StatisticsPage, {
  statisticsGateway: new LocalstorageStatisticsGateway(),
})
