const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      paths: [
        {
          rootPathSuffix: 'src',
        },
        {
          rootPathPrefix: '@assets/',
          rootPathSuffix: 'src/assets',
        },
        {
          rootPathPrefix: '@components/',
          rootPathSuffix: 'src/components',
        },
        {
          rootPathPrefix: '@config/',
          rootPathSuffix: 'src/config',
        },
        {
          rootPathPrefix: '@hooks/',
          rootPathSuffix: 'src/hooks',
        },
        {
          rootPathPrefix: '@locales/',
          rootPathSuffix: 'src/locales',
        },
        {
          rootPathPrefix: '@pages/',
          rootPathSuffix: 'src/pages',
        },
        {
          rootPathPrefix: '@routes/',
          rootPathSuffix: 'src/routes',
        },
        {
          rootPathPrefix: '@services/',
          rootPathSuffix: 'src/services',
        },
        {
          rootPathPrefix: '@styles/',
          rootPathSuffix: 'src/styles',
        },
        {
          rootPathPrefix: '@utils/',
          rootPathSuffix: 'src/utils',
        },
        {
          rootPathPrefix: '@models/',
          rootPathSuffix: 'src/models',
        },
      ],
    },
  ]),
);
