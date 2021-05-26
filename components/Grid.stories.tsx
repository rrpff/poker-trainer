import { Meta } from '@storybook/react'
import { Row, Column } from './Grid'

export default {
  title: 'Grid',
} as Meta

export const WithTwoColumns = () => (
  <Row>
    <Column><Row>a</Row><Row>b</Row><Row>c</Row></Column>
    <Column><Row>d</Row><Row>e</Row><Row>f</Row></Column>
  </Row>
)

export const WithThreeColumns = () => (
  <Row>
    <Column><Row>a</Row><Row>b</Row><Row>c</Row></Column>
    <Column><Row>d</Row><Row>e</Row><Row>f</Row></Column>
    <Column><Row>g</Row><Row>h</Row><Row>i</Row></Column>
  </Row>
)

export const WithOneColumn = () => (
  <Row>
    <Column><Row>a</Row><Row>b</Row><Row>c</Row></Column>
  </Row>
)
