import { forwardRef } from 'react';
import type { Ref, SVGProps } from 'react';

const ChevronDown = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='chevron-down_svg__icon chevron-down_svg__icon-tabler chevron-down_svg__icon-tabler-chevron-down'
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
    <path d='m6 9 6 6 6-6' />
  </svg>
);

export const IconChevronDown = forwardRef(ChevronDown);
