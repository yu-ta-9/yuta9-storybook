import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { Example } from './example';

export default {
  component: Example,
} as ComponentMeta<typeof Example>;

export const Template: ComponentStoryObj<typeof Example> = {
  args: {},
};
