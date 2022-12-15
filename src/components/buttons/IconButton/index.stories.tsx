import { IconButton } from '.';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { IconChevronDown } from '../../icons/ChevronDown';

export default {
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

export const Template: ComponentStoryObj<typeof IconButton> = {
  args: {
    name: 'Story Icon Button',
    svgComponent: <IconChevronDown width={16} height={16} />,
    onClick: () => window.alert('Icon button clicked!!'),
  },
};
