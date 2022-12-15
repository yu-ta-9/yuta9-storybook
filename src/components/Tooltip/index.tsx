import { useEffect, useState } from 'react';

import type { FC } from 'react';

import styles from './index.module.scss';

type Props = {
  /** 表示位置の基準となる要素 */
  basisRef: HTMLElement | null;
  /** 開閉状態 */
  isOpen: boolean;
  /** クローズ関数 */
  onClose: () => void;
  /** 表示位置の基準要素に対する、位置調整オプション */
  isTop?: boolean;
  isBottom?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  leftOffset?: number;
  rightOffset?: number;
};

export const Tooltip: FC<Props> = ({
  basisRef,
  isOpen,
  onClose,
  isTop,
  isBottom,
  isLeft,
  isRight,
  topOffset,
  bottomOffset,
  leftOffset,
  rightOffset,
}) => {
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

  if (!isOpen) {
    return null;
  }

  console.log(document.body.clientHeight);

  return (
    <>
      <div className={styles['tooltip-overlay']} onClick={onClose} />

      <div
        className={styles['tooltip-container']}
        role='tooltip'
        style={{
          top: isTop ? `${(basisRect?.top || 0) + (basisRect?.height || 0) + (topOffset || 0)}px` : '',
          bottom: isBottom
            ? `${
                document.body.clientHeight - (basisRect?.bottom || 0) - (basisRect?.height || 0) + (bottomOffset || 0)
              }px`
            : '',
          left: isLeft ? `${(basisRect?.left || 0) + (basisRect?.width || 0) + (leftOffset || 0)}px` : '',
          right: isRight
            ? `${document.body.clientWidth - (basisRect?.right || 0) + (basisRect?.width || 0) + (rightOffset || 0)}px`
            : '',
        }}
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
