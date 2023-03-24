import { useRef, useState } from 'react';

import { Tooltip } from '.';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconButton } from '../buttons/IconButton';
import { IconTooltip } from '../icons/Tooltip';

export default {
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => {
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

      <Tooltip {...args} basisRef={basisRef.current} isOpen={isOpen} onClose={(): void => setIsOpen(false)} />
    </>
  );
};

export const TopAndRight = Template.bind({});
TopAndRight.args = {
  verticalPosition: 'top',
  verticalOffset: 0,
  horizontalPosition: 'right',
  horizontalOffset: 0,
};

export const BottomAndLeft = Template.bind({});
BottomAndLeft.args = {
  verticalPosition: 'bottom',
  verticalOffset: 0,
  horizontalPosition: 'left',
  horizontalOffset: 0,
};
