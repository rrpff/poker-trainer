import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button, IButtonProps } from './Button'

export default {
  title: 'Button',
  component: Button,
} as Meta

const Template: Story<IButtonProps> = (args) => <Button {...args} />

export const Normal = Template.bind({})
Normal.args = {
  children: 'Click me',
  onClick: action('click'),
}
