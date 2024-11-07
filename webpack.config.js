import path from "path"
import { readFileSync } from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyPlugin from "copy-webpack-plugin"

const packageJson = readFileSync(path.resolve(process.cwd(), 'package.json')).toString()
const { version , name } = JSON.parse(packageJson)

export default {
  mode: 'development',
  entry: path.resolve(process.cwd(), 'src', 'index.js'),
  devtool: 'inline-source-map',
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(process.cwd(), 'build'),
    clean: true,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        type: 'asset/resource',
        use: ['style-loader',  'css-loader', MiniCssExtractPlugin.loader]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'public', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(process.cwd(), 'public', 'style.css'), to: '.' },
        {
          from: path.resolve(process.cwd(), 'package.json'),
          to: path.resolve(process.cwd(), 'build'),
          transform: {
            transformer: () => JSON.stringify({ version, name })
          }
        }
      ]
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
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
  },
}
