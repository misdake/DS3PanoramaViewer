const path = require('path');

module.exports = {
  entry: './src/app.ts',
  devtool: "source-map",
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts']
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
};