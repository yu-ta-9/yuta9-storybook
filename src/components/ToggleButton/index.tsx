import classNames from 'classnames';
import React from 'react';

import styles from './index.module.scss';

type Props = {
  isOn: boolean;
  onToggle: () => void;
};

export const ToggleButton: React.FC<Props> = ({ isOn, onToggle }) => {
  return (
    <div className={classNames(styles['toggle-button'], { [styles['-on']]: isOn })}>
      <span className={classNames(styles['icon'], { [styles['-on']]: isOn })} onClick={onToggle}></span>
    </div>
  );
};
