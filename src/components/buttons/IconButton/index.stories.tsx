import { IconButton } from '.';

import type { StoryObj } from '@storybook/react';

import { IconChevronDown } from '../../icons/ChevronDown';

const meta = {
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    name: 'Story Icon Button',
    svgComponent: <IconChevronDown width={16} height={16} />,
    onClick: () => window.alert('Icon button clicked!!'),
  },
};
