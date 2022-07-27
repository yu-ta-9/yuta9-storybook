import { forwardRef } from 'react';
import type { Ref, SVGProps } from 'react';

const ChevronUp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='chevron-up_svg__icon chevron-up_svg__icon-tabler chevron-up_svg__icon-tabler-chevron-up'
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
    <path d='m6 15 6-6 6 6' />
  </svg>
);

export const IconChevronUp = forwardRef(ChevronUp);
