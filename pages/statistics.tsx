import Head from 'next/head'
import { PageContent } from '../components/PageContent'
import { Layout } from '../containers/Layout'
import { Statistics } from '../containers/Statistics'
import { LocalstorageStatisticsGateway } from '../gateways/LocalstorageStatisticsGateway'
import { withDependencies } from '../lib/withDependencies'

export const StatisticsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Statistics - Poker Trainer</title>
      </Head>

      <PageContent style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Statistics />
      </PageContent>
    </Layout>
  )
}

export default withDependencies(StatisticsPage, {
  statisticsGateway: new LocalstorageStatisticsGateway(),
})
