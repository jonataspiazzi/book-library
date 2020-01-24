const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = env => {
  return {
    entry: ['babel-polyfill', './components/app.js'],
    output: {
      path: path.join(__dirname, outputDirectory),
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.html$/,
          use: {
            loader: "html-loader"
          }
        },
        {
          test: /\.(jpe?g|gif|png|svg|woff2?|eot|ttf)$/,
          loader: "file-loader"
        },
      ]
    },
    devServer: {
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:3001'
      }
    },
    plugins: [
      new CleanWebpackPlugin([outputDirectory]),
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: './public/images/favicon.ico'
      })
    ]
  };
}