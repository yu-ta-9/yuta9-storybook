import { forwardRef } from 'react';

import type { Ref, SVGProps } from 'react';

const Tooltip = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='tooltip_svg__icon tooltip_svg__icon-tabler tooltip_svg__icon-tabler-tooltip'
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
    strokeWidth={2}
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    ref={ref}
    {...props}
  >
    <path d='M0 0h24v24H0z' stroke='none' />
    <circle cx={12} cy={18} r={2} />
    <path d='m12 13-1.707-1.707A1 1 0 0 0 9.586 11H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2.586a1 1 0 0 0-.707.293L12 13z' />
  </svg>
);

export const IconTooltip = forwardRef(Tooltip);
