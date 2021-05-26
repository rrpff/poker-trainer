import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Choice, IChoiceProps } from './Choice'

export default {
  title: 'Choice',
  component: Choice,
} as Meta

const Template: Story<IChoiceProps> = (args) => <Choice {...args} />

export const Normal = Template.bind({})
Normal.args = {
  children: 'choice',
  onClick: action('click'),
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'choice',
  onClick: action('click'),
}
