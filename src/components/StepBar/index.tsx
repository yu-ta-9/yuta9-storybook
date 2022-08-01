import classNames from 'classnames';
import React from 'react';

import styles from './index.module.scss';

export type StepStatus = 'progress' | 'completed';

type Props = {
  steps: string[];
  currentStepNumber: number;
  currentStepStatus: StepStatus;
};

export const StepBar: React.FC<Props> = ({ steps, currentStepNumber, currentStepStatus }) => {
  return (
    <div className={styles['step-bar']}>
      {steps.map((e, i) => {
        return (
          <div key={i} className={styles['step']}>
            <div
              className={classNames(styles['index'], [
                i + 1 < currentStepNumber
                  ? styles['-completed']
                  : i + 1 === currentStepNumber
                  ? currentStepStatus === 'progress'
                    ? styles['-progress']
                    : styles['-completed']
                  : null,
              ])}
            >
              {i + 1}
            </div>
            <div
              className={classNames(styles['label'], {
                [styles['-reached']]: i + 1 <= currentStepNumber,
              })}
            >
              {e}
            </div>
            {i !== 0 && (
              <div
                className={classNames(styles['bar'], {
                  [styles['-reached']]: i < currentStepNumber,
                })}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
