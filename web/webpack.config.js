/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const Dotenv = require('dotenv-webpack');
const { ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const root = path.join(__dirname, '..');
const isProd = process.env.NODE_ENV === 'production';

const compileNodeModules = [
  'react-native-web',
  'react-native-animatable',
  'react-native-image-picker',
  'react-native-vector-icons',
  'react-native-picker-select',
  'react-native-flash-message',
  'react-native-keyboard-aware-scroll-view',
].map((module) => path.resolve(root, `node_modules/${module}`));

const babelRule = {
  test: [/\.(tsx|ts|jsx|js)$/],
  include: [
    path.resolve(root, 'src'),
    path.resolve(root, 'assets'),
    path.resolve(__dirname, 'index.js'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['module:metro-react-native-babel-preset'],
      plugins: ['react-native-web'],
    },
  },
};

const tsRule = {
  test: /\.(tsx|ts|jsx|js|mjs)$/,
  exclude: /node_modules/,
  loader: 'ts-loader',
};

const imageRule = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

const cssRule = {
  test: /\.(css|min.css)$/,
  use: [
    !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: !isProd,
      },
    },
  ],
};

const ttfRule = {
  test: /\.ttf$/,
  loader: 'url-loader',
  include: [
    path.resolve(root, 'node_modules/react-native-vector-icons'),
    path.resolve(root, 'assets/fonts/Gilroy'),
  ],
};

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    app: path.resolve(__dirname, 'index.js'),
  },
  output: {
    path: path.resolve(root, 'dist'),
    filename: 'app-[hash].bundle.js',
  },
  module: {
    rules: [babelRule, tsRule, imageRule, cssRule, ttfRule],
  },
  plugins: [
    new Dotenv({ path: path.resolve(root, '.env') }),
    new ProvidePlugin({ process: 'process/browser' }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.jsx', '.web.js', '.jsx', '.js'],
    alias: Object.assign({
      'react-native$': 'react-native-web',
      'react-native-fast-image': 'react-native-web/dist/exports/Image',
      'react-native-image-viewing': 'react-native-web/dist/exports/View',
      '@navigation': path.resolve(root, 'src/navigation'),
      '@components': path.resolve(root, 'src/components'),
      '@screens': path.resolve(root, 'src/screens'),
      '@utils': path.resolve(root, 'src/utils'),
      assets: path.resolve(root, 'assets'),
    }),
  },
};
