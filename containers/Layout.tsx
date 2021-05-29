import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { CSSProperties, Fragment, ReactNode } from 'react'
import breakpoints from '../styles/breakpoints'
import { Navigation } from '../components/Navigation'

export interface ILayoutProps {
  children: ReactNode
  background?: CSSProperties['color']
  navigationBackground?: CSSProperties['color']
  navigationColor?: 'light' | 'dark'
}

const LINKS = [
  { name: 'practice', href: '/' },
  { name: 'hands', href: '/hands' },
  { name: 'statistics', href: '/statistics' },
  { name: 'about', href: '/about' },
]

export const Layout = (props: ILayoutProps) => {
  usePageBackground(props.background)
  const { pathname } = useRouter()

  return (
    <Fragment>
      <Navigation
        selectedHref={pathname}
        links={LINKS}
        background={props.navigationBackground}
        color={props.navigationColor}
      />
      <Main>
        {props.children}
      </Main>
    </Fragment>
  )
}

const usePageBackground = (color: CSSProperties['color'] = '#f0f1f3') => {
  if (typeof window === 'undefined') return

  document.querySelector('html')!.style.background = color
}

const Main = styled.main`
  margin-top: 70px;
  z-index: 10;

  ${breakpoints.desktop} {
    margin-top: 55px;
  }
`
