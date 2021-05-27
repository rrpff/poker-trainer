import type { AppProps } from 'next/app'
import { DependencyProvider } from 'react-use-dependency'
import { IAppDependencies } from '../types'
import { knuthDealer } from '../lib/dealers/knuth'
import { Layout } from '../containers/Layout'
import { LocalstorageStatisticsGateway } from '../gateways/LocalstorageStatisticsGateway'
import '../styles/globals.css'

const dependencies: IAppDependencies = {
  dealer: knuthDealer,
  statisticsGateway: new LocalstorageStatisticsGateway(),
}

function App({ Component, pageProps }: AppProps) {
  return (
    <DependencyProvider value={dependencies}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DependencyProvider>
  )
}

export default App
