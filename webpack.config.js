const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        include: path.resolve(__dirname, 'src/img'),
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        include: path.resolve(__dirname, 'src/img/icon'),
        type: 'asset/resource',
        generator: {
          filename: 'img/icon/[name][ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      inject: true,
      chunks: ['index'],
      filename: 'about.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/projects.html',
      inject: true,
      chunks: ['index'],
      filename: 'projects.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/tasks.html',
      inject: true,
      chunks: ['index'],
      filename: 'tasks.html',
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
      publicPath: '/',
    },
    open: true,
    hot: true,
    port: 8080,
  },

  mode: 'development',
};