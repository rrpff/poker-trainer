import { Story, Meta } from '@storybook/react'
import { Navigation, INavigationProps } from './Navigation'

export default {
  title: 'Navigation',
  component: Navigation,
} as Meta

const Template: Story<INavigationProps> = (args) => <Navigation {...args} />

export const WithPages = Template.bind({})
WithPages.args = {
  selectedHref: '#!/play',
  links: [
    { name: 'Play', href: '#!/play' },
    { name: 'Hands', href: '#!/hands' },
    { name: 'Simulation', href: '#!/simulation' },
    { name: 'Stats', href: '#!/stats' },
  ],
}

export const WithNoPages = Template.bind({})
WithNoPages.args = {
  links: [],
}
