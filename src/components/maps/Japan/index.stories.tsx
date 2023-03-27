import { Japan } from '.';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: Japan,
  parameters: {
    docs: {
      description: {
        component: 'geojson data from: https://japonyol.net/editor/article/47-prefectures-geojson.html',
      },
    },
  },
} as ComponentMeta<typeof Japan>;

export const Template: ComponentStory<typeof Japan> = (_args) => {
  return (
    <div
      style={{
        width: '800px',
        height: '800px',
        border: '1px solid #ccc',
      }}
    >
      <Japan />
    </div>
  );
};
