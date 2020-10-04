const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  main: path.join(__dirname, 'src', 'index.js'),
  cms: path.join(__dirname, 'src', 'js', 'cms.js'),
  layouts: path.join(__dirname, 'site', 'layouts'),
  src: path.join(__dirname, 'src'),
};

module.exports = {
  entry: {
    main: PATHS.main,
    cms: PATHS.cms,
  },

  output: {
    path: path.join(__dirname, 'dist'),
  },

  // https://webpack.js.org/configuration/resolve/
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/[hash].[ext]',
      },
      {
        loader: 'babel-loader',
        test: /\.js?$/,
        exclude: /node_modules/,
        query: { cacheDirectory: true },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    // Emits a json file with assets paths.
    // https://github.com/ztoben/assets-webpack-plugin
    new AssetsPlugin({
      filename: 'webpack.json',
      path: path.join(process.cwd(), 'site/data'),
      prettyPrint: true,
    }),
    // Copies individual files or entire directories, which already exist, to the build directory.
    // https://webpack.js.org/plugins/copy-webpack-plugin/
    new CopyWebpackPlugin({
      patterns: [
      {
        // Bypass css pipeline because Purge CSS screws it up.
        from: 'node_modules/progressive-image.js/dist/progressive-image.css',
        to: '.',
      },
    ]
    }),
    // https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      filename: 'admin/index.html',
      template: 'src/cms.html',
      inject: false,
    }),
    // https://developers.google.com/web/tools/workbox/guides/codelabs/webpack
    // https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
    // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    // https://developers.google.com/web/tools/workbox/guides/precache-files
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      // Instructs the latest service worker to take control of all clients as soon as it's activated.
      clientsClaim: true,
      // Instructs the latest service worker to activate as soon as it enters the waiting phase.
      skipWaiting: true,
      // Do not precache images.
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`{${PATHS.layouts},${PATHS.src}}/**/*`, { nodir: true }),
    }),
  ],
};
