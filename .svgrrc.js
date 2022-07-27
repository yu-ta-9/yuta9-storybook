module.exports = {
  configFile: './.svgrrc.js',
  icon: true,
  ignoreExisting: true,
  ref: true,
  typescript: true,
  template: (variables, { tpl }) => {
    const svgName = variables.componentName.replace('Svg', '');

    return tpl`
    import { forwardRef } from "react";

    import type { Ref, SVGProps } from 'react';

    const ${svgName} = (${variables.props}): JSX.Element => (
      ${variables.jsx}
    );

    export const ${'Icon' + svgName} = forwardRef(${svgName});
  `;
  },
};
