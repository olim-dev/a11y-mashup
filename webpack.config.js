const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

module.exports = {
  mode: 'development',
  // mode: 'production',
  target: 'web',
  devtool: 'source-map',
  entry: ['whatwg-fetch', 'core-js/stable', 'regenerator-runtime/runtime', './src/index'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname),
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname),
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        include: path.resolve(__dirname),
        use: [
          {
            loader: 'url-loader',
            // options: {
            //   limit: 8192,
            // },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        include: path.resolve(__dirname),
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new CopyWebpackPlugin({ 
      patterns: [
        { from: 'src/assets', to: 'assets', noErrorOnMissing: true },
      ]
    }),
    new webpack.ProvidePlugin({
      "Hammer": "hammerjs/hammer"
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      config: path.resolve(__dirname, 'src/config/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
      utils: path.resolve(__dirname, 'src/utils/'),
    },
    plugins: [
      new DirectoryNamedWebpackPlugin(true),
    ],
    fallback: {
      tty: require.resolve("tty-browserify"),
      fs: false,
      net: false,
    },
  },
};