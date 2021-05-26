import { Story, Meta } from '@storybook/react'
import { SwappableCard, ISwappableCardProps } from './SwappableCard'
import { cardControl } from '../.storybook/controls'

export default {
  title: 'SwappableCard',
  component: SwappableCard,
  argTypes: {
    card: cardControl
  },
} as Meta

const Template: Story<ISwappableCardProps> = (args) => <SwappableCard {...args} />

export const Normal = Template.bind({})
Normal.args = {
  width: 160,
}

export const Small = Template.bind({})
Small.args = {
  width: 80,
}
