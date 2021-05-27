import Head from 'next/head'
import { PageContent } from '../components/PageContent'

export default function About() {
  return (
    <main>
      <Head>
        <title>Poker Trainer - About</title>
      </Head>

      <PageContent>
        <h1>a tool for hopefully getting better at recognising poker hands</h1>

        <p>made by <a href="https://github.com/rrpff">Richard Foster</a></p>
        <p>poker card svgs by <a href="https://www.me.uk/cards/">Adrian Kennard (RevK®)</a></p>
      </PageContent>
    </main>
  )
}
