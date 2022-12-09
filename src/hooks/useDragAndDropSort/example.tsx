import { forwardRef } from 'react';

import { useDragAndDropSort } from '.';

import type { FC, ComponentProps } from 'react';

import styles from './index.module.scss';

import { Badge } from '../../components/Badge';

const ITEMS: { label: string; colorType: 'red' | 'blue' | 'green' }[] = [
  {
    label: 'Java',
    colorType: 'green',
  },
  {
    label: 'Ruby',
    colorType: 'red',
  },
  {
    label: 'JavaScript',
    colorType: 'blue',
  },
];

export const Example: FC = () => {
  const { results: horizontalResults } = useDragAndDropSort<typeof ITEMS[number]>({
    defaultItems: ITEMS,
    disabledPositionX: false,
    disabledPositionY: true,
  });

  const { results: verticalResults } = useDragAndDropSort<typeof ITEMS[number]>({
    defaultItems: ITEMS,
    disabledPositionX: true,
    disabledPositionY: false,
  });

  return (
    <div className={styles['example-hook']}>
      <p className={styles['heading']}>Horizontal move</p>
      <ul className={styles['horizontal']}>
        {horizontalResults.map((e) => (
          <BadgeWrapper
            key={e.key}
            ref={e.events.ref}
            onMouseDown={e.events.onMouseDown}
            label={e.value.label}
            colorType={e.value.colorType}
          />
        ))}
      </ul>

      <span className={styles['spacer']} />

      <p className={styles['heading']}>Vertical move</p>
      <ul className={styles['vertical']}>
        {verticalResults.map((e) => (
          <BadgeWrapper
            key={e.key}
            ref={e.events.ref}
            onMouseDown={e.events.onMouseDown}
            label={e.value.label}
            colorType={e.value.colorType}
          />
        ))}
      </ul>
    </div>
  );
};

const BadgeWrapper = forwardRef<
  HTMLDivElement,
  { onMouseDown: (event: React.MouseEvent<HTMLElement>) => void } & ComponentProps<typeof Badge>
>(({ onMouseDown, ...badgeProps }, ref) => {
  return (
    <div ref={ref} onMouseDown={onMouseDown}>
      <Badge {...badgeProps} />
    </div>
  );
});

BadgeWrapper.displayName = 'BadgeWrapper';
