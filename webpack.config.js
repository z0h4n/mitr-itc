const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevEnv = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  devtool: isDevEnv ? 'source-map' : '',
  devServer: {
    contentBase: '/',
    open: true
  },
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Services': path.resolve(__dirname, 'src/services'),
      '@Classes': path.resolve(__dirname, 'src/classes')
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'index.html']),
    new HtmlWebpackPlugin({ template: 'src/index.html', filename: isDevEnv ? 'index.html' : '../index.html' })
  ]
};