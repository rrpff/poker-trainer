import { Story, Meta } from '@storybook/react'
import { Card, ICardProps } from './Card'
import { cardControl } from '../.storybook/controls'

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    card: cardControl
  },
} as Meta

const Template: Story<ICardProps> = (args) => <Card {...args} />

export const Normal = Template.bind({})
Normal.args = {
  width: 160,
}

export const Small = Template.bind({})
Small.args = {
  width: 80,
}
