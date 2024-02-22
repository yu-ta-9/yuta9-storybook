import { Badge } from '.';

import type { StoryObj } from '@storybook/react';

const meta = {
  component: Badge,
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
    label: 'Java',
    colorType: 'green',
  },
};
