import path from 'path'
import { readFileSync } from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import CopyPlugin from 'copy-webpack-plugin'

const packageJson = readFileSync('./package.json').toString()
const { version, name } = JSON.parse(packageJson)

// eslint-disable-next-line no-restricted-syntax
export default {
  mode: 'development',
  entry: path.resolve(path.resolve(), 'src', 'index'),
  devtool: false,
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve('build'),
    clean: true,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              jsx: true,
              tsx: true,
              decorators: true
            },
            target: 'es2022',
            loose: false,
            transform: {
              react: {
                runtime: 'automatic'
              }
            }
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        type: 'asset/resource',
        use: ['style-loader', 'css-loader', MiniCssExtractPlugin.loader]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.html')
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve('public', 'style.css'), to: '.' },
        {
          from: path.resolve('package.json'),
          to: path.resolve('build'),
          transform: {
            transformer: () => JSON.stringify({ version, name })
          }
        }
      ]
    })
  ],
  optimization: {
    minimize: true,
    chunkIds: 'named',
    moduleIds: 'named',
    mangleExports: false
  },
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    hot: true,
    open: false,
    historyApiFallback: true,
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    }
  }
}
