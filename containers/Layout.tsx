import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { CSSProperties, ReactNode } from 'react'
import { Navigation } from '../components/Navigation'

export interface ILayoutProps {
  children: ReactNode
  background?: CSSProperties['color']
  navigationBackground?: CSSProperties['color']
  navigationColor?: 'light' | 'dark'
}

const LINKS = [
  { name: 'poker hands', href: '/' },
  { name: 'statistics', href: '/statistics' },
  { name: 'about', href: '/about' },
]

export const Layout = (props: ILayoutProps) => {
  const { pathname } = useRouter()

  return (
    <Container background={props.background}>
      <Navigation
        selectedHref={pathname}
        links={LINKS}
        background={props.navigationBackground}
        color={props.navigationColor}
      />
      <Main>
        {props.children}
      </Main>
    </Container>
  )
}

const Container = styled.div<{ background?: CSSProperties['color'] }>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  overflow: auto;

  background: ${props => props.background || '#f0f1f3'};
`

const Main = styled.main`
  margin-top: 70px;
  z-index: 10;

  @media (min-width: 600px) {
    margin-top: 55px;
  }
`
