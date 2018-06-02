var webpack = require('webpack');
var path = require('path');
var libraryName = 'iTree';
var outputFile = libraryName + '.js';

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var env = process.env.WEBPACK_ENV;

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin());
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './index.js',
  },
  output: {
    path: __dirname + '/lib',
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
    ]
  },
  plugins: plugins,
  watch: true,
};

module.exports = config;