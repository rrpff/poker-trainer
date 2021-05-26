import type { AppProps } from 'next/app'
import { DependencyProvider } from 'react-use-dependency'
import { knuthDealer } from '../lib/dealers/knuth'
import { IAppDependencies } from '../types'
import '../styles/globals.css'

const dependencies: IAppDependencies = {
  dealer: knuthDealer
}

function App({ Component, pageProps }: AppProps) {
  return (
    <DependencyProvider value={dependencies}>
      <Component {...pageProps} />
    </DependencyProvider>
  )
}

export default App
