import styled from '@emotion/styled'
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

export type IChoiceProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export const Choice = styled.a<IChoiceProps>`
  display: block;

  color: #8395a7;
  transition: color 0.2s;

  &:hover {
    color: #54a0ff;
  }

  @media (max-width: 600px) {
    padding: 6px 0px;
  }
`
