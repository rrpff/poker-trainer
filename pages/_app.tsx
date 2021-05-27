import type { AppProps } from 'next/app'
import Nprogress from 'nextjs-progressbar'
import { Fragment } from 'react'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Nprogress color="#1dd1a1" />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default App
