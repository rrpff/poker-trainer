import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { HeroInput, IHeroInputProps } from './HeroInput'

export default {
  title: 'HeroInput',
  component: HeroInput,
} as Meta

const Template: Story<IHeroInputProps> = (args) => <HeroInput {...args} />

export const Normal = Template.bind({})
Normal.args = {
  placeholder: 'enter text here',
  onChange: action('change'),
}
