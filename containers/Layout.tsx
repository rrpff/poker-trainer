import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { Fragment, ReactNode } from 'react'
import { Navigation } from '../components/Navigation'

export interface ILayoutProps {
  children: ReactNode
}

const LINKS = [
  { name: 'poker hands', href: '/' },
  { name: 'about', href: '/about' },
]

export const Layout = (props: ILayoutProps) => {
  const { pathname } = useRouter()

  return (
    <Fragment>
      <Navigation selectedHref={pathname} links={LINKS} />
      <Main>
        {props.children}
      </Main>
    </Fragment>
  )
}

const Main = styled.main`
  margin-top: 70px;
  z-index: 10;
`
