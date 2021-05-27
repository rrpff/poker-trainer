import Head from 'next/head'
import { PageContent } from '../components/PageContent'
import { Layout } from '../containers/Layout'
import { Hands } from '../containers/Hands'

export const HandsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Hands - Poker Trainer</title>
      </Head>

      <PageContent style={{ paddingTop: '20px' }}>
        <Hands />
      </PageContent>
    </Layout>
  )
}

export default HandsPage
