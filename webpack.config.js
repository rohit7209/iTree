const webpack = require('webpack');
const path = require('path');
const libraryName = 'iTree';
let outputFile = libraryName + '.js';

const uglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const env = process.env.WEBPACK_ENV;

const plugins = [];

let watch = true;
if (env === 'build') {
  watch = false;
  plugins.push(new uglifyJsWebpackPlugin({
    uglifyOptions: {
      output: {
        comments: false
      },
      compress: {
        warnings: false,
      },
    },
  }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  mode: 'none',
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './index.js',
  },
  output: {
    path: __dirname + '/example',
    filename: outputFile,
  },
  module: {
    rules: [
      {
        test: /\.js$/, //Check for all js files
        loader: 'babel-loader',
        query: {
          presets: ["babel-preset-es2015"].map(require.resolve)
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '/src')
        ],
        loader: 'eslint',
        exclude: /node_modules/
      },
    ]
  },
  plugins: plugins,
  watch,
};

module.exports = config;