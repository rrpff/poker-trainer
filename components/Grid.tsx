import styled from '@emotion/styled'
import { ReactNode } from 'react'

export type IRowProps = { children: ReactNode }
export type IColumnProps = { children: ReactNode }

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`
