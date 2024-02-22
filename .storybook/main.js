const path = require('path');

module.exports = {
  typescript: { reactDocgen: false },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    '@storybook/addon-viewport',
    '@storybook/addon-mdx-gfm',
  ],

  staticDirs: ['../public'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  webpackFinal: async (config) => {
    // エイリアス設定
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, '../src'),
    };

    // SVGを読み込む読み込むための設定
    // ref: https://github.com/storybookjs/storybook/issues/9070#issuecomment-635895868
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push(
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, './src'),
      },
      {
        test: /\.svg$/,
        enforce: 'pre',
        loader: require.resolve('@svgr/webpack'),
      },
    );

    config.module.rules.unshift({
      // MEMO: To adopt 'pdfjs'
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            outputPath: 'static/worker',
          },
        },
      ],
    });

    return config;
  },

  docs: {
    autodocs: true,
  },
};
