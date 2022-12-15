import { forwardRef } from 'react';

import type { Ref, SVGProps } from 'react';

const File = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='file_svg__icon file_svg__icon-tabler file_svg__icon-tabler-file'
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
    <path d='M14 3v4a1 1 0 0 0 1 1h4' />
    <path d='M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z' />
  </svg>
);

export const IconFile = forwardRef(File);
