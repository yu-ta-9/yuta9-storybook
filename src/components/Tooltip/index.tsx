import { useEffect, useMemo, useRef, useState } from 'react';

import type { FC } from 'react';

import styles from './index.module.scss';

type Props = {
  /** basis position for display position */
  basisRef: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  verticalPosition: 'top' | 'bottom';
  horizontalPosition: 'left' | 'right';
  verticalOffset?: number;
  horizontalOffset?: number;
};

type Position = { top?: string; right?: string; bottom?: string; left?: string };

export const Tooltip: FC<Props> = ({
  basisRef,
  isOpen,
  onClose,
  verticalPosition,
  horizontalPosition,
  verticalOffset,
  horizontalOffset,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [basisRect, setBasisRect] = useState<DOMRect>();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (basisRef === null) {
      return;
    }

    setBasisRect(basisRef.getBoundingClientRect());
  }, [isOpen, basisRef]);

  const top = useMemo(
    () => (basisRect?.top || 0) + (basisRect?.height || 0) + (verticalOffset || 0),
    [basisRect?.top, basisRect?.height, verticalOffset],
  );
  const right = useMemo(
    () => document.documentElement.clientWidth - (basisRect?.right || 0) + (horizontalOffset || 0),
    [basisRect?.right, horizontalOffset],
  );
  const bottom = useMemo(
    () => document.documentElement.clientHeight - (basisRect?.top || 0) + (verticalOffset || 0),
    [basisRect?.top, verticalOffset],
  );
  const left = useMemo(() => (basisRect?.left || 0) + (horizontalOffset || 0), [basisRect?.left, horizontalOffset]);

  const position = useMemo<Position>(() => {
    const position: Position = {};

    if (ref.current === null) {
      return position;
    }

    switch (verticalPosition) {
      case 'top':
        if (top + ref.current.getBoundingClientRect().height > document.documentElement.clientHeight) {
          position.bottom = `${bottom}px`;
          break;
        }
        position.top = `${top}px`;
        break;
      case 'bottom':
        if (bottom - ref.current.getBoundingClientRect().height < 0) {
          position.top = `${top}px`;
          break;
        }
        position.bottom = `${bottom}px`;
        break;
    }

    // TODO: implement a function that detects horizontal position is overflow, but need to consider when sp
    switch (horizontalPosition) {
      case 'left':
        position.left = `${left}px`;
        break;
      case 'right':
        position.right = `${right}px`;
        break;
    }

    return position;
  }, [ref, verticalPosition, horizontalPosition, top, right, bottom, left]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles['tooltip-overlay']} onClick={onClose} />

      <div
        ref={ref}
        className={styles['tooltip-container']}
        role='tooltip'
        style={{ top: position.top, right: position.right, bottom: position.bottom, left: position.left }}
      >
        <div>Tooltip Test</div>
        <ul>
          <li>option1</li>
          <li>option2</li>
        </ul>
      </div>
    </>
  );
};
