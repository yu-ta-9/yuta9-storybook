import { StepBar } from '.';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

export default {
  component: StepBar,
} as ComponentMeta<typeof StepBar>;

export const Template: ComponentStoryObj<typeof StepBar> = {
  argTypes: {
    currentStepStatus: {
      options: ['progress', 'completed'],
      control: { type: 'select' },
    },
  },
  args: {
    steps: ['Step1', 'Step2', 'Step3', 'Step4', 'Step5'],
    currentStepNumber: 2,
    currentStepStatus: 'progress',
  },
};
