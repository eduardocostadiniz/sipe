const path = require('path');
const dotenv = require('dotenv')

const HtmlWebPackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require('webpack');

dotenv.config()

module.exports = {
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  devServer: {
    port: 3030,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ['@babel/plugin-transform-runtime']
          },
        },
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new DefinePlugin({
       'process.env': JSON.stringify(process.env)
    })
  ]
};