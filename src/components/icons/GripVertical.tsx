import { forwardRef } from 'react';
import type { Ref, SVGProps } from 'react';

const GripVertical = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='grip-vertical_svg__icon grip-vertical_svg__icon-tabler grip-vertical_svg__icon-tabler-grip-vertical'
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
    <circle cx={9} cy={5} r={1} />
    <circle cx={9} cy={12} r={1} />
    <circle cx={9} cy={19} r={1} />
    <circle cx={15} cy={5} r={1} />
    <circle cx={15} cy={12} r={1} />
    <circle cx={15} cy={19} r={1} />
  </svg>
);

export const IconGripVertical = forwardRef(GripVertical);
