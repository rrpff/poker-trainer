import styled from '@emotion/styled'
import breakpoints from '../styles/breakpoints'

export const PageContent = styled.div`
  max-width: 100%;
  text-align: center;
  padding: 0 20px;

  ${breakpoints.desktop} {
    position: relative;
    margin: auto;
    width: 600px;
  }
`
