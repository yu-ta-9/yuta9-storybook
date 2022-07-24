import { PdfDisplay } from '.';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: PdfDisplay,
} as ComponentMeta<typeof PdfDisplay>;

export const Template: ComponentStory<typeof PdfDisplay> = (_args) => {
  return (
    <div style={{ height: '640px' }}>
      <PdfDisplay url={`${process.env.PUBLIC_URL}/sample.pdf`}></PdfDisplay>
    </div>
  );
};
