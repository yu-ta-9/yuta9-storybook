import { useRef, useState } from 'react';

import { Tooltip } from '.';

import type { StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { IconButton } from '../buttons/IconButton';
import { IconTooltip } from '../icons/Tooltip';

const meta = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: ComponentProps<typeof Tooltip>): any => {
  const basisRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div style={{ margin: '0 auto', width: 'fit-content', height: '100vh', display: 'flex', alignItems: 'center' }}>
        <IconButton
          ref={basisRef}
          name='Open Tooltip'
          svgComponent={<IconTooltip width={16} height={16} onClick={(): void => setIsOpen(true)} />}
        />
      </div>

      <meta.component {...args} basisRef={basisRef.current} isOpen={isOpen} onClose={(): void => setIsOpen(false)} />
    </>
  );
};

export const TopAndRight: Story = {
  args: {
    basisRef: null,
    isOpen: false,
    verticalPosition: 'top',
    verticalOffset: 0,
    horizontalPosition: 'right',
    horizontalOffset: 0,
  },
  // MEMO: アロー関数だとusexxでエラーが出るのでfunctionを使用している
  render: function Comp(args) {
    return Template(args);
  },
};

export const BottomAndLeft: Story = {
  args: {
    basisRef: null,
    isOpen: false,
    verticalPosition: 'bottom',
    verticalOffset: 0,
    horizontalPosition: 'left',
    horizontalOffset: 0,
  },
  // MEMO: アロー関数だとusexxでエラーが出るのでfunctionを使用している
  render: function Comp(args) {
    return Template(args);
  },
};
