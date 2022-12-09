import { Badge } from '.';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

export default {
  component: Badge,
} as ComponentMeta<typeof Badge>;

export const Template: ComponentStoryObj<typeof Badge> = {
  args: {
    label: 'Java',
    colorType: 'green',
  },
};
