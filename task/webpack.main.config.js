const path = require('path');

const env = process.env.NODE_ENV || 'production';

module.exports = {
  entry: {
    main: './src/main/main.ts',
  },
  target: 'electron-main',
  mode: env,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  node: {
    __dirname: true,
    __filename: true
  },
  devtool: env === 'production' ? false : 'source-map',
}
